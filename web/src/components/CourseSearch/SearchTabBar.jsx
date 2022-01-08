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

}));

function SearchTabBar(props) {
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
SearchTabBar.propTypes = {
  labels: PropTypes.array.isRequired,
};

export default SearchTabBar;