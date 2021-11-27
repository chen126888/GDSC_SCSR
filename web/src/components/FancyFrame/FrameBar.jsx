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
import InputBase from '@mui/material/InputBase';
// Main Components

// Styles
import { alpha, makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SvgIcon from '@mui/material/SvgIcon';
// Hooks and Function
import clsx from 'clsx';
// import { useState, useEffect } from 'react';

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
  Button: props => ({
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),

  search: {
    position: 'relative',
    margin: theme.spacing(1, 1, 1, 1),
    height: '80%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    height: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}) );

const EnlargeIcon = props => (
  <SvgIcon {...props} width="180" height="180" viewBox="0 0 180 180" fill="none">
  <path
    d="M 27,27.5 C 16.32674,27.5 7.5,36.32674 7.5,47 v 86 c 0,10.67326 8.82674,19.5 19.5,19.5 h 126 c 10.67326,0 19.5,-8.82674 19.5,-19.5 V 47 c 0,-10.67326 -8.82674,-19.5 -19.5,-19.5 z m 0,15 h 126 c 2.62273,0 4.5,1.877273 4.5,4.5 v 86 c 0,2.62273 -1.87727,4.5 -4.5,4.5 H 27 c -2.622727,0 -4.5,-1.87727 -4.5,-4.5 V 47 c 0,-2.622727 1.877273,-4.5 4.5,-4.5 z"
    id="FullFrame"
    opacity=".3" />
  <path
    d="M 27,27.5 C 16.32674,27.5 7.5,36.32674 7.5,47 v 86 c 0,10.67326 8.82674,19.5 19.5,19.5 h 76 c 10.67326,0 19.5,-8.82674 19.5,-19.5 V 47 c 0,-10.67326 -8.82674,-19.5 -19.5,-19.5 z m 0,15 h 76 c 2.62273,0 4.5,1.877273 4.5,4.5 v 86 c 0,2.62273 -1.87727,4.5 -4.5,4.5 H 27 c -2.622727,0 -4.5,-1.87727 -4.5,-4.5 V 47 c 0,-2.622727 1.877273,-4.5 4.5,-4.5 z"
    id="LeftFrame" />
  </SvgIcon>
);
const ShrinkIcon = props => (
  <SvgIcon {...props}  width="180" height="180" viewBox="0 0 180 180" fill="none">
    <path
      d="M 27,27.5 C 16.32674,27.5 7.5,36.32674 7.5,47 v 86 c 0,10.67326 8.82674,19.5 19.5,19.5 h 126 c 10.67326,0 19.5,-8.82674 19.5,-19.5 V 47 c 0,-10.67326 -8.82674,-19.5 -19.5,-19.5 z m 0,15 h 126 c 2.62273,0 4.5,1.877273 4.5,4.5 v 86 c 0,2.62273 -1.87727,4.5 -4.5,4.5 H 27 c -2.622727,0 -4.5,-1.87727 -4.5,-4.5 V 47 c 0,-2.622727 1.877273,-4.5 4.5,-4.5 z"
      id="FullFrame"
      opacity=".3" />
    <path
      d="m 127,27.5 c -10.67326,0 -19.5,8.82674 -19.5,19.5 v 86 c 0,10.67326 8.82674,19.5 19.5,19.5 h 26 c 10.67326,0 19.5,-8.82674 19.5,-19.5 V 47 c 0,-10.67326 -8.82674,-19.5 -19.5,-19.5 z m 0,15 h 26 c 2.62273,0 4.5,1.877273 4.5,4.5 v 86 c 0,2.62273 -1.87727,4.5 -4.5,4.5 h -26 c -2.62273,0 -4.5,-1.87727 -4.5,-4.5 V 47 c 0,-2.622727 1.87727,-4.5 4.5,-4.5 z"
      id="RightFrame" />
  </SvgIcon>
);
const FullScreenIcon = props => (
  <SvgIcon {...props} width="180" height="180" viewBox="0 0 180 180" fill="none">
    <path
      d="M 27,27.5 C 16.32674,27.5 7.5,36.32674 7.5,47 v 86 c 0,10.67326 8.82674,19.5 19.5,19.5 h 126 c 10.67326,0 19.5,-8.82674 19.5,-19.5 V 47 c 0,-10.67326 -8.82674,-19.5 -19.5,-19.5 z m 0,15 h 126 c 2.62273,0 4.5,1.877273 4.5,4.5 v 86 c 0,2.62273 -1.87727,4.5 -4.5,4.5 H 27 c -2.622727,0 -4.5,-1.87727 -4.5,-4.5 V 47 c 0,-2.622727 1.877273,-4.5 4.5,-4.5 z"
      id="FullFrame" />
  </SvgIcon>
);

function FrameBar (props) {
  const classes = useStyles(props);

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* Title */}
        <Typography 
          component="h2"
          variant="h4" 
          align='left'
          className={classes.frameTitle}
        >
          {props.frameTitleLabel}
        </Typography>

        {/* Input */}
        { props.isShowSearch && (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              // onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
            />
          </div>
        ) }

        {/* FramePanel */}
        <ButtonGroup className={classes.framePanel} >
          {/* Enlarge */}
          { props.buttonEnlargeShow && (
            <Button className={classes.Button} onClick={props.handleEnlarge} >
              { (props.frameSize === 1) ? (
                <FullScreenIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              ) }
            </Button> 
          ) }
          {/* Shrink */}
          { props.buttonShrinkShow && (
            <Button className={classes.Button} onClick={props.handleShrink} >
            { (props.frameSize === 1) ? (
                <ShrinkIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              ) }
            </Button> 
          ) }
          {/* Custom */}
          { clsx(props.isShowCustom) && props.buttonCustom }

        </ButtonGroup>

      </Toolbar>
    </AppBar>
  );
};

export default FrameBar;