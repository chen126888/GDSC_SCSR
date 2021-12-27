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
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  sheetRoot: {
    height: '100%',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    overflowY: "auto",
    /** scrollbar hidden */
    "-ms-overflow-style": 'none',
    "scrollbar-width": 'none',
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },

}));

function QuickBox(props){ 
  return (
    <Box
      sx={{
        flexGrow: props.flexGrowNum,
        flexDirection: 'row',
        display: 'flex',
      }}
      component={props.component}
    >
      {props.children}
    </Box>
  )
};

function Sheet({
  courseWeekData, itemHeight,
}) {
  const classes = useStyles({});

  const sheetExport = useMemo(() => {
    let flexGrowNum = 7;
    let columnConfigObject = {};
    let firstClassTimeArray = [];
    let lastClassTimeArray = [];
    let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let weekDaysZh = {
      "Mon": "一", "Tue": "二", "Wed": "三", "Thu": "四", "Fri": "五", "Sat": "六", "Sun": "日"
    }

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

      if (
        (renderResult.length === 0) && (["Sat", "Sun"].includes(weekKey))
      ) {
        delete weekDays[weekDays.indexOf(weekKey)];
        flexGrowNum -= 1;
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

    return [
      <QuickBox key={"header"} component={"header"} >
        <SheetRow
          itemHeight={itemHeight * 0.5}
          rowIndex={""}
          variant={"title"}
          flexGrow={0.4}
          key={0}
        />
        <QuickBox flexGrowNum={flexGrowNum} >
          {weekDays.map((weekKey, i) => (
            <SheetRow
              itemHeight={itemHeight * 0.5}
              rowIndex={weekDaysZh[weekKey]}
              variant={"title"}
              flexGrow={0.4}
              key={i}
            />
          ))}
        </QuickBox>
      </QuickBox>
      ,
      <QuickBox key={"main"} component={"main"} >
        <RowTitle
          itemHeight={itemHeight}
          firstClassTime={firstClassTime}
          lastClassTime={lastClassTime}
        />
        <QuickBox flexGrowNum={flexGrowNum} >
          {columnExport}
        </QuickBox>
      </QuickBox>
    ]
  }, [courseWeekData, itemHeight]);

  return (
    <Box className={classes.sheetRoot}>
      {sheetExport}
    </Box>
  );
};
Sheet.defaultProps = {
  courseWeekData: dummyWeekData,
  itemHeight: 8,
};
Sheet.propTypes = {
  courseWeekData: PropTypes.object.isRequired,
  itemHeight: PropTypes.number.isRequired,
};

export default Sheet;