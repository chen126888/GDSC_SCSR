// Material Components
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from "@material-ui/core/Typography";
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Hooks and Function
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles( theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
  }), 
  toolbar: props => ({
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    padding: '0 0 0 0 !important',
    height: '5vh',
    alignItems: 'center',
    justifyContent: "center",
    verticalAlign: 'middle',
  }),
  framePanel: props => ({
    marginRight: theme.spacing(props.spacingLv),
    height: '100%',
  }),
  frameTitle: {
    marginRight: 12,
    marginLeft: 12,
    flexGrow: 1,
    height: '100%',
    lineHeight: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  backButton: props => ({
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),

}) );

function FrameBar (props) {
  const classes = useStyles(props);

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* BackButton */}
        { props.isHomePage ? (
          <Button 
            className={classes.backButton}
            onClick={props.backButtonClick}
          >
            <ArrowBackIcon/>
          </Button> ) : '' 
        }

        {/* Title */}
        <Typography 
          component="h2"
          variant="h4" 
          align='left'
          className={classes.frameTitle}
        >
          {props.frameTitleLabel}
        </Typography>

        {/* FramePanel */}
        <ButtonGroup className={classes.framePanel} >
          {props.panelButtons}
        </ButtonGroup>

      </Toolbar>
    </AppBar>
  );
};
// TabLabel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

export default FrameBar;