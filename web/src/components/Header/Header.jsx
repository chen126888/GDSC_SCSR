// Material Components
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// Main Components
import Frame from '../FancyFrame/Frame';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const useStyles = makeStyles( theme => createStyles({
  root: {
    top: '0',
    height: '40vh',
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
  }

}) );

function HeadContent (props) {
  const classes = useStyles(props);


  return (
    <header className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={8} id='selectTimeline'>

        </Grid>
        <Grid item xs={1} id='enrollment'>

        </Grid>
        <Grid item xs={1} id='search'>

        </Grid>
        <Grid item xs={1} id='courseMap'>

        </Grid>
        <Grid item xs={1} id='profile'>

        </Grid>
      </Grid>
    </header>
  );
};