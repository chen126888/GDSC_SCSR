// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// Hooks and Function
import { childPropsGiver } from '../FancyFrame/FrameFunctions';
import { useState } from 'react';

const useStyles = makeStyles(theme => createStyles({
  Button: {
    // borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  },
  frameChild: {
    // height: "100%",
  },
  frameChildContent: {
    // height: "100%",
  }

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
      scrollButtons="auto"
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
    buttonCustom: [(<DummybuttonCustom {...props} key={1} />), (<DummybuttonCustom {...props} key={2} />)],
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
    <div className={classes.frameChild} key={props.keyForChild}>
      {BarWithProps}
      <Box className={classes.frameChildContent}>
        It's dummy child content
        size: {props.frameSize}
        key = {props.keyForChild}
      </Box>
    </div>
  )
};

export { DummybuttonCustom, DummyPanel, DummyFrameChild };