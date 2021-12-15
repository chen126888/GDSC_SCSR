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

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';

// Hooks and Function
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  itemButton: {

  },
  itemModal: {

  },
  cardActions: {
    textAlign: 'right',
  },

}));

const useStylesForCourseItem = makeStyles(theme => createStyles({
  root: coursePosition => ({
    position: "relative",
    top: coursePosition.top,
    left: coursePosition.left,
    width: coursePosition.width,
    height: coursePosition.height,
  })
}));

function CourseItem({
  courseTitle, courseState, coursePosition, courseInfo, top
}) {
  const classes = useStylesForCourseItem(coursePosition);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper className={classes.root}>
      <Button
        onClick={handleOpen}
        className={classes.itemButton}
      >
        <Paper>
          <Grid container>
            <Grid xs={12}>
              <Typography>
                bala
                {courseTitle}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography>
                bala
              </Typography>
            </Grid>
            <Grid xs={4}>
              icon components
              {courseState}
            </Grid>
          </Grid>
        </Paper>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card variant="outlined" className={classes.itemModal}>

          <CardHeader title={
            "wwww"
          } />

          <CardContent className={classes.cardContent}>
            courseInfo
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button size="small">Learn More</Button>
          </CardActions>

        </Card>
      </Modal>
    </Paper>
  );
};

function SheetColumn({
  courseTodayData,
}) {

  let dummyData = [
    {
      "name": "blabla1",
      "time": [8, 9, 10],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla3",
      "time": [11, 12, 13],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla4",
      "time": [15, 16, 17],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    },
  ]

  const generateArrange = courseDataObject => {
    let timeArray = Array.from({ length: 24 }, (e, i) => 0);
    let scheduleArray = Array.from({ length: 24 }, (e, i) => []);
  
    courseDataObject.forEach((e, i) => {
      e.time.forEach((clock, j) => {
        timeArray[clock] += 1;
        scheduleArray[clock].push(i);
      });
    });
    let stackNum = Math.max(...timeArray);
  
    let positionMatrix = Array.from({ length: stackNum }, (e, i) => (
      Array.from({ length: 24 }, (e, i) => -1)
    ));
  
    courseDataObject.forEach((e, i) => {
      for (let stackIndex = 0; stackIndex < stackNum; stackIndex++) {
        let isClear = true;
        e.time.forEach((hour, j) => {
          isClear = (positionMatrix[stackIndex][hour] === -1) && isClear;
        })
  
        if (isClear) {
          e.time.forEach((hour, j) => {
            positionMatrix[stackIndex][hour] = i;
          })
          break;
        }
      }
  
    });
  
    /**
     * timeArray: 統計每個小時裡有幾門課
     *  - structure:
     *    [ numOfCourse for 00:00, numOfCourse for 01:00, ... ] for 24 hours
     * scheduleArray: 列出這個小時內列選的課程序號矩陣,0在矩陣上表示沒有課程
     *  - structure:
     *    [[ index1 for course at 00:00, index2, ... ] for each stack, ... ] for 24 hours
     * stackNum: 最高有幾門課排在同一時段
     *  - type: int
     */
  
    return { timeArray, scheduleArray, positionMatrix, stackNum }
  };

  const renderSchedule = (
    courseDataObject, timeArray, scheduleArray, positionMatrix, stackNum
  ) => {
    let configMatrix = positionMatrix.map((stack, i) => {
      let unitConfig = {
        "top": 0,
        "left": i,
        "width": 1,
        "height": 0,
      }
      let configColumn = [{ ...unitConfig }];
      let indexConfig = 0;
      stack.forEach((courseIndex, i) => {
        if (courseIndex === -1) {
          if (configColumn[indexConfig]["height"] === 0) {
            configColumn[indexConfig]["top"] += 1;
          } else {
            indexConfig += 1;
            configColumn[indexConfig] = { ...unitConfig };
            configColumn[indexConfig]["top"] += 1;
          }
        } else {
          configColumn[indexConfig]["height"] += 1;
        }
        // return configColumn
      });

      return configMatrix
    });
  };



  // const renderColumn = 

  return (
    <Grid container >

    </Grid>
  )


};