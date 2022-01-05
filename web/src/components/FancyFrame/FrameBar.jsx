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
import { EnlargeIcon, ShrinkIcon, FullScreenIcon } from './../../image/FrameBarIcon';

// Hooks and Function

const useStyles = makeStyles(theme => createStyles({
  root: props => ({
    // color: theme.palette.primary.contrastText,
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    flexGrow: 1,
    maxHeight: '7vh',
    minHeight: '7vh',
    display: 'flex',
    position: 'relative',
  }),
  toolbar: props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    padding: '0 0 0 0 !important',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: "center",
    verticalAlign: 'middle',
  }),
  frameTitle: props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    marginRight: 12,
    marginLeft: 12,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }),
  Button: props => ({
    /** This control the button of size change */
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),
  search: {
    display: 'none',
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
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
  panelFunction: props => ({
    flexGrow: 2,
  }),
  panelButton: props => ({
    marginRight: theme.spacing(props.spacingLv),
    flexGrow: 0,
    align: 'right',
  }),

}));

function FrameBar(props) {
  const classes = useStyles(props);

  return (
    <AppBar position='static' className={classes.root} >
      <Toolbar className={classes.toolbar}>
        {/* Title */}
        <Typography
          className={classes.frameTitle}
          component="h2"
          variant="h4"
          align='left'
        >
          {props.frameTitleLabel}
        </Typography>

        {/* panelFunction or panelCustom */}
        {(props.panelCustomShow && props.frameSize !== 0) && (
          <Paper
            className={classes.panelFunction}
            sx={{ borderRadius: 16, }}
          >
            {props.panelCustom}
          </Paper>
        )}

        {/* Input */}
        {(props.searchInputShow && props.frameSize !== 0) && (
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
            />
          </div>
        )}

        {/* FramePanel */}
        <ButtonGroup 
          className={classes.panelButton}
        >
          {props.buttonCustomShow && (
            props.buttonCustom
          )}
          {props.buttonEnlargeShow && (
            <Button className={classes.Button} onClick={props.handleEnlarge} >
              {(props.frameSize === 1) ? (
                <FullScreenIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              )}
            </Button>
          )}
          {props.buttonShrinkShow && (
            <Button className={classes.Button} onClick={props.handleShrink} >
              {(props.frameSize === 1) ? (
                <ShrinkIcon fontSize='large' />
              ) : (
                <EnlargeIcon fontSize='large' />
              )}
            </Button>
          )}
        </ButtonGroup>

      </Toolbar>
    </AppBar>
  );
};

export default FrameBar;