// Material Components
import Button from '@mui/material/Button';
// Main Components
import TabLabel from './TabPart/TabLabel';
import CourseTabBar from './TabPart/TabBar';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// Hooks and Function
import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';

const useStyles = makeStyles(theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'white !important',
    // color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
    // transition: theme.transitions.create("all", {
    //   easing: theme.transitions.easing.sharp, 
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  }),
  tabBar: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'white !important',
    // color: theme.palette.primary.contrastText,
    width: "50%",
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
  tabBarItem: {
    fontSize: theme.spacing(3),
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
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const TabContents = props.contents.map((tabContent, i) => (
    <TabLabel value={value} index={i} key={i} >
      TabContent-{tabContent}
      s;s;s;s;-{i}
      lalalal
      {props.spacingLv}
    </TabLabel>
  ));
  const CourseTabContent = props => (
    <div className={classes.root}>
      {TabContents}
    </div>
  )

  // Bar Add
  const BarWithProps = childPropsGiver(props.BarTaker, {
    buttonCustom: [(<DummybuttonCustom {...props} />), (<DummybuttonCustom {...props} />)],
    panelCustom: (
      <CourseTabBar
        onChange={handleChange}
        handleCloseButton={props.handleCloseButton}
        labels={props.labels}
        value={value}
        spacingLv={props.spacingLv}
      />
    ),
  })

  return (
    <Fragment >
      {BarWithProps}
      <CourseTabContent />
    </Fragment>
  );
};
CourseTabs.propTypes = {
  contents: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default CourseTabs;