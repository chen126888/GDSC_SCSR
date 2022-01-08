// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components
import SearchTabBar from './SearchTabBar';
import SimpleSearch from './SimpleSearch';
import AdvancedSearch from './AdvancedSearch';
import { DummybuttonCustom } from '../Main/DummyComponent';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import { useState, Fragment } from 'react';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';

const useStyles = makeStyles(theme => createStyles({
    tabBarItem: {
      fontSize: theme.spacing(3),
    },
    tabMain: {
      flexGrow: 14,
      overflowY: "scroll",
      /** scrollbar hidden */
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      padding: theme.spacing(2),
      boxShadow: `inset ${theme.spacing(0)}px ${theme.spacing(1)}px ${theme.spacing(1)}px rgba(0, 0, 0, 0.25)`,
    },
    tabFrame: {
      overflowY: "scroll",
      /** scrollbar hidden */
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      height: '100%',
      width: "100%",
      margin: 0,
      padding: 0,
    },
    tabContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
  
      
    },
    Button: props => ({
      // borderTopLeftRadius: theme.spacing(props.spacingLv),
      color: 'white !important',
      height: '100%',
    }),
  
  }));

const SearchTabs = ({ BarTaker, frameSize }) => {
    const classes = useStyles();
    const [ labels, setLables ] = useState(["簡易搜尋","進階搜尋"]);

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    // Bar Add
    const TabBarWithProps = childPropsGiver(BarTaker, {
        buttonCustom: [
          (<DummybuttonCustom key={0} />),
          (<DummybuttonCustom key={1} />)
        ],
        panelCustom: (
          <SearchTabBar
            onChange={handleChange}
            labels={labels}
            value={value}
          />
        ),
    })

    const TabMain = (
        <Box component="main" className={classes.tabMain} >
          { value == 0 ? <SimpleSearch/> : <AdvancedSearch/>}
        </Box>
    );

    return (
    <Fragment >
        {TabBarWithProps}
        {TabMain}
    </Fragment>
    );
}


export default SearchTabs;
