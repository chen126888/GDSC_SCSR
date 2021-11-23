// Material Components
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// Main Components
import FrameBar from './FrameBar';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const useStyles = makeStyles( theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    top: 0,
    width: props.expandControl ? props.expandWidth : props.normalWidth,
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    zIndex: props.zIndex,
    overflow: 'hidden',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
  }), 
  paper: props => ({
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100% - ${2*theme.spacing(props.spacingLv)}px)`,
    marginTop: theme.spacing(props.spacingLv),
    marginBottom: theme.spacing(props.spacingLv),
    marginRight: theme.spacing(
      props.spacingLv * ( ((props.justifyFrame==='left') && (!props.expandControl)) ? 1/2 : 1 )
    ),
    marginLeft: theme.spacing(
      props.spacingLv * ( ((props.justifyFrame==='right') && (!props.expandControl)) ? 1/2 : 1 )
    ),
    borderRadius: `${theme.spacing(props.spacingLv)}px !important`,
  }),

}) );
function Frame (props) {
  // const { children, value, index, ...other } = props;
  
  const classes = useStyles(props);

  return (
    <Box className={classes.root} >
      <Paper
        // variant="outlined"
        className={classes.paper}
      >
        <FrameBar
          // spacingLv={props.spacingLv}
          // isHomePage={props.isHomePage}
          {...props}
        />
        {props.children}
      </Paper>
    </Box>
  )
};

export default Frame;