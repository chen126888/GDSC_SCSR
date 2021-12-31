// Material Components
import Grid from '@mui/material/Grid';
// import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
// import clsx from 'clsx';
// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles( theme => createStyles({
  root: {
    top: '0',
    height: '15vh',
    width: '100%',
    position: 'absolute',
  },
  gridContainer: {
    height: '100%',
    width: '100%',
  },
  maintainPanel: {
    zIndex: 1021,
    position: 'absolute',
  },
  buttonSquare: {
    // backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    verticalAlign: 'middle',
    // AlignItems: 'center',
    display: 'flex',
  }

}) );

function HeadContent (props) {
  const classes = useStyles(props);

  return (
    <header className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={7} id='Timeline'>
          There is a fancy Timeline Chart
          IMAGENERY!!!
        </Grid>
        <Grid item xs={1} className={classes.buttonSquare}  id='courseEnrollment'>
          <Button 
            onClick={props.callCourseEnrollment}
            variant="outlined"
          >登記課表</Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonSquare} id='courseSearch'>
          <Button 
            onClick={props.callCourseSearch} 
            variant="outlined"
          >課程搜尋</Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonSquare} id='courseRouteMap'>
          <Button 
            onClick={props.callCourseRouteMap} 
            variant="outlined"
          >課程地圖</Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonSquare} id='courseTracking'>
          <Button 
            onClick={props.callCourseTracking} 
            variant="outlined"
          >備選清單</Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonSquare} id='profile'>
          <Button
            variant="outlined" 
          >profile</Button>
        </Grid>
      </Grid>
    </header>
  );
};
HeadContent.propTypes = {
  callCourseEnrollment: PropTypes.func,
  callCourseSearch: PropTypes.func,
  callCourseRouteMap: PropTypes.func,
  callCourseTracking: PropTypes.func,
};

export default HeadContent;