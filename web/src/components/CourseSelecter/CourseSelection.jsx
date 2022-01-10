// Material Components
// Main Components
import TabBar from '../TabCustom/TabBar';
import TabPanel from '../TabCustom/TabPanel';
import Sheet from "./SheetPart/Sheet";
import { FrameInner, FrameBarSummary } from '../FancyFrame/FrameInner';
import { DummybuttonCustom } from '../DummyComponent';
import { SaveButton } from './CourseFunction'
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useAxiosEffect } from '../../hooks/useAxios';
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

  return (
    <Fragment >
      <FrameBarSummary
        barTaker={BarTaker}
        buttonCustom={[
          (<SaveButton key={0} />),
          (<DummybuttonCustom key={1} />),
        ]}
        panelCustom={
          <TabBar
            onChange={handleChange}
            labels={labels}
            value={value}
          />
        }
      />
      <FrameInner>
        {contents.map((tabContent, i) => (
          <TabPanel
            value={value}
            index={i}
            key={i}
            className={classes.tabFrame}
          >
            {loading ? <p>loading...</p> : ""}
            <Sheet courseWeekData={tabContent} itemHeight={6} />
          </TabPanel>
        ))}
      </FrameInner>
    </Fragment>
  );
};
TabBar.propTypes = {
  BarTaker: PropTypes.node,
  frameSize: PropTypes.number,
}

export default CourseTabs;