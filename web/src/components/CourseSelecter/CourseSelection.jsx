// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components
import TabLabel from './TabPart/CourseTabLabel';
import CourseTabBar from './TabPart/CourseTabBar';
// import SheetColumn from './CourseSheet';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// Hooks and Function
import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';

const useStyles = makeStyles(theme => createStyles({
  tabBar: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'white !important',
    // color: theme.palette.primary.contrastText,
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
  tabBarItem: {
    fontSize: theme.spacing(3),
  },
  tabContainer: {
    height: 'calc(100% - 5vh)',
    width: "100%",
  },
  tabContent: {
    height: 'calc(100%)',
    width: "100%",
    // display: 'flex',
    // flexGrow: 1,
    // flexDirection: 'row',
    margin: 0,
    padding: 0
  },
  Button: props => ({
    // borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),

}));

const DummybuttonCustom = props => {
  const classes = useStyles(props);
  return (
    <Button className={classes.Button} >
      <MinimizeIcon fontSize='large' ></MinimizeIcon>
    </Button>
  )
};

  // Tabs
function CourseTabs(props) {
  const classes = useStyles(props);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  // Bar Add
  const TabBarWithProps = childPropsGiver(props.BarTaker, {
    buttonCustom: [
      (<DummybuttonCustom {...props} />),
      (<DummybuttonCustom {...props} />)
    ],
    panelCustom: (
      <CourseTabBar
        onChange={handleChange}
        handleCloseButton={props.handleCloseButton}
        labels={props.labels}
        value={value}
        spacingLv={props.spacingLv}
        className={classes.tabBar}
      />
    ),
  })

  const TabMain = (
    <Box 
      component="main" 
      className={classes.tabContainer} 
    >
      {props.contents.map((tabContent, i) => (
        <TabLabel
          value={value}
          index={i}
          key={i}
          className={classes.tabContent}
        >
          TabContent-{tabContent}
          s;s;s;s;-{i}
          lalalal
          {props.spacingLv}
          {/* <SheetColumn /> */}
        </TabLabel>
      ))}
    </Box>
  );

  return (
    <Fragment >
      {TabBarWithProps}
      {TabMain}
    </Fragment>
  );
};
CourseTabs.propTypes = {
  contents: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default CourseTabs;