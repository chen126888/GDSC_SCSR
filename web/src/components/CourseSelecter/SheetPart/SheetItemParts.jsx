// Material Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Main Components
import {
  SelectableIcon, RegisterableIcon, InRegisterIcon, AccepttedIcon, UnreservedIcon
} from './../../../image/SheetIcon';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';
import React from 'react';
import { useAxiosEffect } from '../../../hooks/useAxios';

const useStyles = makeStyles(theme => {
  return createStyles({
    root: {

    }
  })
})

function CourseStateShow ({ courseState }) {
  switch (courseState) {
    case "Selectable": {
      return <SelectableIcon />
    }
    case "Registerable": {
      return <RegisterableIcon />
    }
    case "InRegister": {
      return <InRegisterIcon />
    }
    case "selected": {
      return <AccepttedIcon />
    }
    case "Unreserved": {
      return <UnreservedIcon />
    }
    default: {
      return <SelectableIcon />
    }
  }
}
CourseStateShow.defaultProps = {
  courseInfo: PropTypes.string.isRequired,
}

function CourseInfoShow ({
  courseTitle, courseState, courseInfo, courseTime
}) {
  const classes = useStyles();
  const { response: contents, loading, error } = useAxiosEffect({
    method: 'GET',
    url: '/classInfo/'+courseInfo.course_id,
    headers: {
      accept: "application/json",
    },
    responeDefault: {
      ...courseInfo,
      instructor: "",
      unit:"",
      credit:"",
      alteration:"",
      remain:"",
      location:"",
      language:"",
      enrollment:"",
      syllabus:"",
      regulation:"",
    }
  })

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component="h3" variant="h3" className={classes.title} >
          {courseTitle}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="body1" className={classes.body} >
          {courseTitle}
        </Typography>
        <Typography component="body1" className={classes.body} >
          {courseState}
        </Typography>
        <Typography component="body1" className={classes.body} >
          {courseTime}
        </Typography>
      </Grid>

    </Grid>
  )

}
CourseInfoShow.defaultProps = {
  courseInfo: PropTypes.object.isRequired,
}


export { CourseInfoShow, CourseStateShow }