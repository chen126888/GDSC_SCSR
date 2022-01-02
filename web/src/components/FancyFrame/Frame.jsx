// Material Components
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
// Main Components
import FrameBar from './FrameBar';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  frameWidthGiver, frameEnlargePass, frameShrinkPass, childPropsGiver
} from './FrameFunctions';

const useStyles = makeStyles(theme => createStyles({
  root: props => ({
    width: `${props.frameWidth}%`,
    flexGrow: 1,
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    display: 'flex',
  }),
  paper: props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: theme.spacing(props.spacingLv),
    marginBottom: theme.spacing(props.spacingLv),
    marginRight: theme.spacing(props.spacingLv * 1 / 2),
    marginLeft: theme.spacing(props.spacingLv * 1 / 2),
    borderRadius: `${theme.spacing(props.spacingLv)}px !important`,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',

  }),
  maintainInfo: {
    display: 'none',
    flexGrow: 1,
  },

}));

/* 0:smalll, 1:medium, 2:large */
function Frame(props) { 
  const frameSize = props.frameSize;
  const [isEnlarge, setIsEnlarge] = useState(frameEnlargePass(props.allowMax, frameSize));
  const [isShrink, setIsShrink] = useState(frameShrinkPass(props.allowMin, frameSize));

  const propsStyled = {
    spacingLv: props.spacingLv,
    frameSize: frameSize,
    frameWidth: frameWidthGiver(frameSize),
  };
  const classes = useStyles(propsStyled);

  const handleEnlarge = () => {
    props.moveEnlarge();
    /* handle Onclick import from parents components */
  };
  const handleShrink = () => {
    props.moveShrink();
    /* handle Onclick import from parents components */
  };

  const ChildWithProps = childPropsGiver(props.children, {
    frameSize: frameSize,
    spacingLv: props.spacingLv,
    BarTaker: (
      <FrameBar
        buttonEnlargeShow={isEnlarge}
        buttonShrinkShow={isShrink}
        handleEnlarge={handleEnlarge}
        handleShrink={handleShrink}

        searchInputShow={props.searchInputShow}
        buttonCustomShow={props.buttonCustomShow}
        panelCustomShow={props.panelCustomShow}
        frameTitleLabel={props.frameTitleLabel}

        spacingLv={props.spacingLv}
        frameSize={frameSize}
        frameWidth={frameWidthGiver(frameSize)}
      />
    ),

  });

  const MaintainInfo = props => (
    <Typography 
      className={classes.maintainInfo}
      component="p" 
      variant="body1"
    >
      {' / isEnlarge: '}{String(isEnlarge)},
      {' / isShrink: '}{String(isShrink)},
      {' / spacing: '}{String(props.spacingLv)},
      {' / frameWidth: '}{`${frameWidthGiver(frameSize)}%`},
      {' / frameSize: '}{`${frameSize}`},
      {' / allowMax: '}{String(props.allowMax)},
      {' / allowMin: '}{String(props.allowMin)},
      {' / index: '}{String(props.index)},
      {' / frameTitleLabel: '}{String(props.frameTitleLabel)},
      {' / searchInputShow: '}{String(props.searchInputShow)},
      {' / buttonCustomShow: '}{String(props.buttonCustomShow)},
    </Typography>
  );

  const frameSizeChange = () => {
    setIsEnlarge(frameEnlargePass(props.allowMax, frameSize));
    setIsShrink(frameShrinkPass(props.allowMin, frameSize));
  };
  useEffect(frameSizeChange, [props.allowMax, props.allowMin, frameSize]);

  return (
    <Box
      className={classes.root}
      key={props.indexForFrame}
      component="section"
    >
      <Paper
        variant="outlined"
        className={classes.paper}
        component="article"
      >
        <MaintainInfo {...props} />
        {ChildWithProps}
      </Paper>
    </Box>
  )
};
Frame.propTypes = {
  children: PropTypes.node,
  allowMax: PropTypes.number.isRequired,
  allowMin: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  moveEnlarge: PropTypes.func.isRequired,
  moveShrink: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  frameTitleLabel: PropTypes.string.isRequired,
  searchInputShow: PropTypes.bool.isRequired,
  buttonCustomShow: PropTypes.bool.isRequired,
};
Frame.defaultProps = {
  moveEnlarge: () => console.log('Enlarge'),
  moveShrink: () => console.log('Shrink'),
  frameSize: 1
}
export default Frame;
