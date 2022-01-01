// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components
import TabLabel from './TabPart/CourseTabLabel';
import CourseTabBar from './TabPart/CourseTabBar';
import Sheet from "./SheetPart/Sheet";
import { DummybuttonCustom } from '../Main/DummyComponent';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useAxiosEffect } from '../../hooks/useAxios';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';
import PropTypes from 'prop-types';

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

// Tabs
function CourseTabs({
  BarTaker, frameSize
}) {
  const classes = useStyles();
  const [ labels, setLables ] = useState([1,2]);
  const { response: contents, loading, error } = useAxiosEffect({
    method: 'GET',
    url: '/dummyCourseData.json',
    headers: {
      accept: "application/json",
    },
    responeDefault: [{
      "Mon": [], "Tue": [], "Wed": [], "Thu": [],
      "Fri": [], "Sat": [], "Sun": []
    }],
    sideEffect: () => {
      setLables(contents.length);
    }
});


  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  // Bar Add
  const TabBarWithProps = childPropsGiver(BarTaker, {
    buttonCustom: [
      (<DummybuttonCustom key={0} />),
      (<DummybuttonCustom key={1} />)
    ],
    panelCustom: (
      <CourseTabBar
        onChange={handleChange}
        labels={labels}
        value={value}
      />
    ),
  })

  const TabMain = (
    <Box component="main" className={classes.tabMain} >
      {contents.map((tabContent, i) => (
        <TabLabel
          value={value}
          index={i}
          key={i}
          className={classes.tabFrame}
        >
          {loading ? <p>loading...</p> : ""}
          <Sheet courseWeekData={tabContent} itemHeight={6} />
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

export default CourseTabs;