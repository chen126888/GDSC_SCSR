// Material Components
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import Typography from '@mui/material/Typography';
// Main Components
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => {

  return createStyles({
    tabContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100%',
    },
    tabList: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '90%',
    },
    tabItem: {
      flexGrow: 0.2,
      color: theme.palette.text.disabled,
      padding: 'auto',
      border: 'none',
      borderRadius: theme.spacing(5),
      margin: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      cursor: 'pointer',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },

      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows.frameInner,
      },

      transition: theme.transitions.create(['background-color']),
    },
  })
});

function TabBar(props) {
  const classes = useStyles(props);

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })
  const labelProps = (index) => ({
    label: index,
    'aria-label': index,
  })

  return (
    <TabsUnstyled
      value={props.value}
      onChange={props.onChange}
      className={classes.tabContainer}
    >
      <TabsListUnstyled className={classes.tabList}>
        {props.labels.map((tabLabel, i) => {
          return (
            <TabUnstyled
              {...labelProps(tabLabel)}
              {...a11yProps(i)}
              className={classes.tabItem}
              key={i}
            >
              <Typography
                className={classes.title}
                variant={"h5"}
                component={"h5"}
                align={"center"}
              >
                {tabLabel}
              </Typography>

            </TabUnstyled>
          )
        })}
      </TabsListUnstyled>

    </TabsUnstyled>
  );
};
TabBar.propTypes = {
  labels: PropTypes.array.isRequired,
};

export default TabBar;