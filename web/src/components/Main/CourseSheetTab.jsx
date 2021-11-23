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
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
  }), 
  paper: props => ({
    top: 0,
    width: props.expandControl ? props.expandWidth : props.normalWidth,
    height: `calc(100% - ${2*theme.spacing(props.spacingLv)}px)`,
    marginTop: theme.spacing(props.spacingLv),
    marginBottom: theme.spacing(props.spacingLv),
    marginRight: theme.spacing(
      props.spacingLv * ( ((props.justifyFrame==='left') && (!props.expandControl)) ? 1/2 : 1 )
    ),
    marginLeft: theme.spacing(
      props.spacingLv * ( ((props.justifyFrame==='right') && (!props.expandControl)) ? 1/2 : 1 )
    ),
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),

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
                {...a11yProps(i)} 
              />
            )})
          } 
        </Tabs>
      </Grid>

      <Grid item xs={2} className={classes.modalCloseButtonGrid}>
        <Button 
          className={classes.modalCloseButton} 
          onClick={props.handleCloseButton} 
        >
          <CloseIcon size="large" />
        </Button> 
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

  const TabContents = props.contents.map((guestList, i) => (
    <TabLabel value={value} index={i} key={i} >
      TabContent-{guestList}
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