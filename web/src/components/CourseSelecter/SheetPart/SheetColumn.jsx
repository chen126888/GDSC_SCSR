// Material Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Main Components
import CourseItem from './SheetItem';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';

// Hooks and Function
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { generateArrange, calcCoursePosition, dummyData } from './SheetColumnRender';

const useStyles = makeStyles(theme => createStyles({
  dayRoot: props => ({
    position: "relative",
    height: "100%",
    width: "100%",
    display: 'flex',
    flexGrow: 1, 
    flexDirection: 'row',
  }),
  daySubColumn: props => ({
    position: "relative",
    height: "100%",
    width: "100%",
    display: 'flex',
    flexGrow: 1, 
  }),

}));


function DayColumn({
  courseTodayData,
}) {
  const classes = useStyles();

  const renderColumn = courseDataObject => {
    let {
      stackArray, stackNum, scheduleArray, positionMatrix
    } = generateArrange(courseDataObject);
    let configMatrix = calcCoursePosition(positionMatrix);
    console.log(stackArray, stackNum, scheduleArray, positionMatrix, configMatrix);
    let renderResult = configMatrix.map((column, i) => (
      <Paper className={classes.daySubColumn} >
        {column.map((courseConfig, j) => (
          <CourseItem
            courseTitle={courseDataObject[courseConfig.id].name}
            courseState={courseDataObject[courseConfig.id].state}
            coursePosition={courseConfig}
            courseInfo={courseDataObject[courseConfig.id].info}
          />
        ))}
      </Paper>
    ))
    return renderResult
  };

  return (
    <Paper className={classes.dayRoot} >
      {renderColumn(dummyData)}
      {/* at sheet */}
    </Paper>
  )


};

export default DayColumn;