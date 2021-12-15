// Material Components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
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

function CourseTabBar(props) {
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
CourseTabBar.propTypes = {
  labels: PropTypes.array.isRequired,
};

export default CourseTabBar;