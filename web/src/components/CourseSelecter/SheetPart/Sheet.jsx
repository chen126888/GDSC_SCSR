// Material Components
import Box from '@mui/material/Box';
// Main Components
import DayColumn from './SheetColumn';
import SheetRow from './SheetRow';
import RowTitle from './SheetRowTitle';
import { generateArrange, renderColumn, dummyWeekData } from './SheetColumnRender';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import { useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  sheetRoot: {
    height: '100%',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    overflowY: "scroll",
    overflowX: "hidden",

    // scrollbarColor: "#808080 #b3b3b3",
    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
      backgroundColor: "#f0f0f0",
      borderRadius: theme.spacing(2),
      width: theme.spacing(2),
      boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
      borderRadius: theme.spacing(2),
      background: "#B9B9B9",
      // boxShadow: 'inset 0px 3px 4px rgba(255, 255, 255, 0.6)',
      minHeight: 24,
    },
    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
      backgroundColor: "#f0f0f0",
    },
    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
      backgroundColor: "#f0f0f0",
    },
    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#7188b4",
    },
    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
      backgroundColor: "#f0f0f0",
    },
    scrollBehavior: "smooth",

  },
  quickBox: {
    flexGrow: 1,
    flexDirection: 'row',
    display: 'flex',
    padding: 0,
  }

}));

function Sheet({
  courseWeekData, itemHeight,
}) {
  const classes = useStyles({});

  const sheetExport = useMemo(() => {
    let columnConfigObject = {};
    let firstClassTimeArray = [];
    let lastClassTimeArray = [];
    let weekDaysZh = {
      "Mon": "一", "Tue": "二", "Wed": "三", "Thu": "四", "Fri": "五", "Sat": "六", "Sun": "日"
    }
    let weekDays = Object.keys(weekDaysZh);

    weekDays.forEach((weekKey, i) => {
      let {
        stackArray, stackNum, firstClassTime, lastClassTime, positionMatrix
      } = generateArrange(courseWeekData[weekKey]);

      columnConfigObject[weekKey] = {
        stackArray: stackArray,
        stackNum: stackNum,
        positionMatrix: positionMatrix,
      };
      firstClassTimeArray.push(firstClassTime);
      lastClassTimeArray.push(lastClassTime);
    });

    console.log(firstClassTimeArray, lastClassTimeArray)
    let firstClassTime = Math.min(...firstClassTimeArray);
    let lastClassTime = Math.max(...lastClassTimeArray);

    let columnExport = weekDays.map((weekKey, i) => {
      let renderResult = renderColumn(
        courseWeekData[weekKey],
        columnConfigObject[weekKey].positionMatrix,
        firstClassTime,
        itemHeight,
        columnConfigObject[weekKey].stackArray,
        columnConfigObject[weekKey].stackNum
      );

      if ((renderResult.length === 0) && (["Sat", "Sun"].includes(weekKey))) {
        delete weekDays[weekDays.indexOf(weekKey)];
        return false;
      } else {
        return (
          <DayColumn
            key={weekKey}
            today={weekKey}
            itemHeight={itemHeight}
            renderResult={renderResult}
            firstClassTime={firstClassTime}
            lastClassTime={lastClassTime}
          />
        )
      }
    });

    return (
      <Fragment>
        <thead className={classes.quickBox} >
          <tr className={classes.quickBox} >
            <SheetRow
              key={0}
              itemHeight={itemHeight * 0.5}
              rowIndex={"#"}
              variant={"title"}
              flexGrow={0.4}
              component={"th"}
            />
            {weekDays.map((weekKey, i) => (
              <SheetRow
                key={i}
                itemHeight={itemHeight * 0.5}
                rowIndex={weekDaysZh[weekKey]}
                variant={"title"}
                flexGrow={1}
                component={"th"}
              />
            ))}
          </tr>
        </thead>
        <tbody className={classes.quickBox} >
          <tr className={classes.quickBox} >
            <RowTitle
              itemHeight={itemHeight}
              firstClassTime={firstClassTime}
              lastClassTime={lastClassTime}
            />
            {columnExport}
          </tr>
        </tbody>
      </Fragment>
    )
  }, [courseWeekData, itemHeight, classes]);

  return (
    <Box className={classes.sheetRoot} component={"table"} >
      {sheetExport}
    </Box>
  );
};
Sheet.defaultProps = {
  courseWeekData: dummyWeekData,
  itemHeight: 7,
};
Sheet.propTypes = {
  courseWeekData: PropTypes.object.isRequired,
  itemHeight: PropTypes.number.isRequired,
};

export default Sheet;