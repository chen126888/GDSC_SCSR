// Material Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from "@material-ui/core/Typography";
// Main Components
import { SearchBox, ButtonEnlarge, ButtonShrink } from './FrameBarItemize';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function

const useStyles = makeStyles(theme => {
  const transitionConfig = props => ({
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
  const overflowRule = props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
  })
  const borderRadiusConfig = props => ({
    borderTopRightRadius: theme.spacing(props.spacingLv),
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    borderBottomRightRadius: theme.spacing(0),
    borderBottomLeftRadius: theme.spacing(0),
  })

  return createStyles({
    root: props => ({
      ...transitionConfig(props),
      ...overflowRule(props),
      ...borderRadiusConfig(props),
      flexGrow: 1,
      maxHeight: '7vh',
      minHeight: '7vh',
      display: 'flex',
      boxShadow: theme.shadows.none,
    }),
    toolbar: props => ({
      ...overflowRule(props),
      ...borderRadiusConfig(props),
      padding: '0 0 0 0 !important',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      verticalAlign: 'middle',
    }),
    frameTitle: props => ({
      ...overflowRule(props),
      marginRight: 12,
      marginLeft: 12,
      flexGrow: 1.5,
    }),
    panelFunction: props => ({
      flexGrow: 2,
      align: 'center',
      border: '1px solid white'
    }),
    panelButton: props => ({
      flexGrow: 0,
    }),
  });
});

function FrameBar(props) {
  const classes = useStyles(props);

  return (
    <AppBar
      position='static'
      className={classes.root}
      color='antiPrimary'
    >
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
          <Box className={classes.panelFunction} >
            {props.panelCustom}
          </Box>
        )}

        {/* Input */}
        {(props.searchInputShow && props.frameSize !== 0) && (
          <SearchBox />
        )}

        {/* FramePanel */}
        <ButtonGroup className={classes.panelButton} >
          {props.buttonCustomShow && (
            props.buttonCustom
          )}
          {props.buttonEnlargeShow && (
            <ButtonEnlarge frameSize={props.frameSize} onClick={props.handleEnlarge} />
          )}
          {props.buttonShrinkShow && (
            <ButtonShrink frameSize={props.frameSize} onClick={props.handleShrink} />
          )}
        </ButtonGroup>

      </Toolbar>
    </AppBar>
  );
};

export default FrameBar;