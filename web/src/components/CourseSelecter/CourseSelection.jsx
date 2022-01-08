// Material Components
// import Box from '@mui/material/Box';
// Main Components
import TabLabel from './TabPart/CourseTabLabel';
import CourseTabBar from './TabPart/CourseTabBar';
import Sheet from "./SheetPart/Sheet";
import FrameInner from '../FancyFrame/FrameInner';
import { DummybuttonCustom } from '../Main/DummyComponent';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useAxiosEffect } from '../../hooks/useAxios';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(theme => createStyles({
  tabBarItem: {
    fontSize: theme.spacing(3),
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
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
  },

}));

// Tabs
function CourseTabs({
  BarTaker, frameSize
}) {
  const classes = useStyles();

  const [labels, setLables] = useState([1, 2]);
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

  if (clsx(error)) {
    console.log(error);
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  // Bar Add
  const tabBarWithProps = childPropsGiver(BarTaker, {
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

  const TabMain = props => (
    <FrameInner>
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
    </FrameInner>
  );

  return (
    <Fragment >
      {tabBarWithProps}
      {/* {tabMain} */}
      <TabMain />
    </Fragment>
  );
};
CourseTabBar.propTypes = {
  BarTaker: PropTypes.node,
  frameSize: PropTypes.number,
}

export default CourseTabs;