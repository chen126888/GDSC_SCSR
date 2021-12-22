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
  root: coursePosition => ({
    position: "relative",
    // display: 'flex',
    top: coursePosition.top,
    left: coursePosition.left,
    width: coursePosition.width,
    height: coursePosition.height,
  })
}));

function Sheet ({ draftCourseSelection }) {
  const classes = useStyles(props);



  return (
    
  )
}