// Material Components
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
// Hooks and Function
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles( theme => createStyles({
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
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
  tabBarItem: {
    fontSize: theme.spacing(3),
  },

}) );

// TabPanel for content
const TabLabel = props => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && ( <Box p={3}> {children} </Box> )}
    </div>
  );
};
TabLabel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CourseTabBar (props) {
  const classes = useStyles(props);

  const a11yProps = (index) => ({
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  })

  return (
  <AppBar position="static" className={classes.tabBar} >
    <Grid container >
      <Grid item xs={10} >
        <Tabs
          value={props.value}
          onChange={props.onChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs"
        > { props.labels.map((tabLabel, i) => {
            return (
              <Tab 
                label={tabLabel} 
                aria-label={tabLabel} 
                className={classes.tabBarItem} 
                key={i}
                wrapped
                {...a11yProps(i)} 
              />
            )})
          } 
        </Tabs>
      </Grid>

    </Grid>
  </AppBar>
  );
};
CourseTabBar.propTypes = {
  labels: PropTypes.array.isRequired,
};

// Tabs
function CourseTabs (props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const TabContents = props.contents.map((tabContent, i) => (
    <TabLabel value={value} index={i} key={i} >
      TabContent-{tabContent}
    </TabLabel>
  ) );

  return (
    <div className={classes.root}>
      <CourseTabBar 
        onChange={handleChange}
        handleCloseButton={props.handleCloseButton}
        labels={props.labels}
        value={value}
      />
      {TabContents}
    </div>
  );
};
CourseTabs.propTypes = {
  contents: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default CourseTabs;