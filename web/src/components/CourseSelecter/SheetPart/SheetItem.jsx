// Material Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Main Components
import { CourseInfoShow, CourseStateShow } from './SheetItemParts';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const useStylesCourseItem = makeStyles(theme => {
  const positionItem = (
    { top, left, width, height, itemHeight, isFullWidth }
  ) => ({
    position: "absolute",
    top: `calc(${top * itemHeight}vh + ${(top) * 2.5}px)`,
    left: `${left * width}%`,
    width: `${(isFullWidth ? 100 : width)}%`,
    height: `calc(${height * itemHeight}vh + ${(height) * 3}px)`,
    flexGrow: 1,
    zIndex: 1210,
    "&:hover": {
      zIndex: 1220,
    },
  })
  const paletteItem = ({ type }) => {
    switch (type) {
      case "other":
        /** 必修課程 required */
        return {
          color: `${theme.palette.info.contrastText} !important`,
          backgroundColor: `${theme.palette.info.main} !important`,
        }
      case "required":
        /** 必修課程 required */
        return {
          color: `${theme.palette.secondary.contrastText} !important`,
          backgroundColor: `${theme.palette.secondary.main} !important`,
        }
      case "normal":
        /** 普通課程 normal */
        return {
          color: `${theme.palette.primary.contrastText} !important`,
          backgroundColor: `${theme.palette.primary.main} !important`,
        }
      default:
        return {
          color: `${theme.palette.primary.contrastText} !important`,
          backgroundColor: `${theme.palette.primary.main} !important`,
        }
    }
  }

  return createStyles({
    root: config => ({
      ...positionItem(config),
      ...paletteItem(config),
      borderRadius: `${theme.spacing(1)} !important`,
      overflow: 'hidden',
    }),
    button: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },
    buttonPaper: config => ({
      ...paletteItem(config),
      height: '100%',
      width: '100%',
      overflowX: 'scroll',
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }),
    title: {
      padding: theme.spacing(0.4),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    teacherState: {
      display: 'flex',

    },
    teacher: {
      padding: theme.spacing(0.4),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexGrow: 1,
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: theme.spacing(3),

      borderRadius: `${theme.spacing(4)} !important`,
      alignItems: 'center',
      justifyContent: 'center',

    },
    cardActions: {
      borderRadius: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row-reverse',
    },

  })
})

/**
 * @param {String} courseTitle the name of course, name.
 * @param {String} courseState the selected state of course, state.
 * @param {Object} itemConfig the position, height, and width of course.
 * @param {Object} courseInfo the other info of course, simple_info.
 * @param {Array} courseTime the time of course, time.
 * @returns {React.Component} CourseItem
 */
function CourseItem({
  courseTitle, courseState, itemConfig, courseInfo, courseTime
}) {
  const classes = useStylesCourseItem({
    ...itemConfig,
    type: courseInfo.type,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper className={classes.root} >
      <Button onClick={handleOpen} className={classes.button} >
        <Box container className={classes.buttonPaper} >
          <Typography component="h4" className={classes.title} >
            {courseTitle}
          </Typography>
          <div className={classes.teacherState}>
            <Typography variant="subtitle2" className={classes.teacher} >
              {courseInfo.teacher}
            </Typography>
            <CourseStateShow courseState={courseState} />
          </div>
        </Box>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Card variant="outlined" className={classes.modal}>
          <CardHeader title={"課程詳細資料"} />
          <CardContent className={classes.cardContent}>
            <CourseInfoShow
              {...{ courseTitle, courseState, courseInfo, courseTime }}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="large" onClick={handleClose}>
              關閉
            </Button>
            <Button size="large" variant="contained">
              取消登記
            </Button>
          </CardActions>

        </Card>
      </Modal>
    </Paper>
  );
};
CourseItem.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  courseState: PropTypes.string.isRequired,
  itemConfig: PropTypes.object.isRequired,
  courseInfo: PropTypes.object.isRequired,
  courseTime: PropTypes.array.isRequired,
};

export default CourseItem;