// Material Components
// import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Main Components
import CourseTabs from '../CourseSelecter/CourseSheetTab';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';

// Hooks and Function
import { childPropsGiver } from '../FancyFrame/FrameFunctions';
import { useState } from 'react';

// 1. Click Header buttons, if can shrink, then shrink, otherwise be repalced.
// 2. Click enlarge button in small frame, 
//    left one enlarging to replace right one and call anther one small frame at oringnal palce.

// 2: large: 備選清單、課程搜尋
// 1: medium: 備選清單、課程搜尋、課程地圖、登記課表
// 0: small: 備選清單、課程地圖

// [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']

const useStyles = makeStyles(theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  Button: props => ({
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),

}));

// Children Component Example
const DummybuttonCustom = props => {
  const classes = useStyles(props);
  return (
    <Button className={classes.Button} >
      <MinimizeIcon fontSize='large' ></MinimizeIcon>
    </Button>
  )
};
const DummyPanel = props => {
  const classes = useStyles(props);

  const a11yProps = (index) => ({
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  })

  return (
    <Tabs
      value={props.value}
      onChange={props.onChange}
      textColor="secondary"
      indicatorColor="secondary"
      variant="scrollable"
      scrollButtons="off"
      aria-label="scrollable prevent tabs"
    > {props.labels.map((tabLabel, i) => {
      return (
        <Tab
          label={tabLabel}
          aria-label={tabLabel}
          className={classes.tabBarItem}
          key={i}
          wrapped
          {...a11yProps(i)}
        />
      )
    })
      }
    </Tabs>
  );
};
const DummyFrameChild = props => {
  const classes = useStyles(props);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const BarWithProps = childPropsGiver(props.BarTaker, {
    buttonCustom: [(<DummybuttonCustom />), (<DummybuttonCustom />)],
    panelCustom: (
      <DummyPanel
        onChange={handleChange}
        handleCloseButton={props.handleCloseButton}
        labels={['bla1', 'bla2']}
        value={value}
      />
    ),
  })

  return (
    <div key={props.keyForChild}>
      {BarWithProps}
      <Box>
        It's dummy child content
        size: {props.frameSize}
        key = {props.keyForChild}
      </Box>
    </div>
  )
};

// Pass chilren data
var demoFrameData = [
  {
    label: '登記課表',
    defaultDisplay: 1,
    allowMax: 1,
    allowMin: 1,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: false,
    children:
      <CourseTabs
        contents={[(
          <DummyFrameChild key={3} />
        ), (
          <DummyFrameChild key={4} />
        )]}
        labels={["1", "2"]}
        key={1}
      />,
  }, {
    label: '備選清單',
    defaultDisplay: 0,
    allowMax: 2,
    allowMin: 0,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <DummyFrameChild key={1} />,
  }, {
    label: '課程搜尋',
    defaultDisplay: -1,
    allowMax: 2,
    allowMin: 1,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <DummyFrameChild key={1} />,
  }, {
    label: '課程地圖',
    defaultDisplay: -1,
    allowMax: 1,
    allowMin: 0,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <DummyFrameChild key={1} />,
  },
];

export { DummyFrameChild, DummybuttonCustom, demoFrameData };
