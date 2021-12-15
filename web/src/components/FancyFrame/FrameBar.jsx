// Material Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from "@material-ui/core/Typography";
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
// Main Components

// Styles
import { alpha, makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { EnlargeIcon, ShrinkIcon, FullScreenIcon } from './FrameBarIcon';

// Hooks and Function

const useStyles = makeStyles( theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    // color: theme.palette.primary.contrastText,
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
  }), 
  toolbar: props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
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
  frameTitle: props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    marginRight: 12,
    marginLeft: 12,
    // flexGrow: 1,
    height: '100%',
    lineHeight: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }),
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
    color: 'inherit !important',
    height: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: 'inherit !important',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  panelCustom: props => ({
    flexGrow: 1,

  }),

}) );

function FrameBar (props) {
  const classes = useStyles(props);

  return (
    <AppBar position='static' className={classes.root} >
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

        <Paper 
          className={classes.panelCustom}
          sx={{ borderRadius: 16,}}  
        >
          { (props.panelCustomShow && props.frameSize !== 0) && (
            props.panelCustom
          ) }
        </Paper>

        {/* Input */}
        { (props.searchInputShow && props.frameSize !== 0) && (
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
          { props.buttonCustomShow && props.buttonCustom }
          { props.buttonEnlargeShow && (
            <Button className={classes.Button} onClick={props.handleEnlarge} >
              { (props.frameSize === 1) ? (
                <FullScreenIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              ) }
            </Button> 
          ) }
          { props.buttonShrinkShow && (
            <Button className={classes.Button} onClick={props.handleShrink} >
            { (props.frameSize === 1) ? (
                <ShrinkIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              ) }
            </Button> 
          ) }

        </ButtonGroup>

      </Toolbar>
    </AppBar>
  );
};

export default FrameBar;