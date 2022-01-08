// Material Components
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

const useStyles = makeStyles(theme => {
  const frameWidthString = props => ({
    width: `${props.frameWidth}%`,
  })
  const transitionConfig = props => ({
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
  const overflowRule = props => ({
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
  })
  const marginConfig = props => {
    let spaceLv = props.spacingLv;
    const space = theme.spacing;

    return ({
      marginTop: space(spaceLv),
      marginBottom: space(spaceLv),
      marginRight: space(spaceLv*(props.frameSize === 0 ? 1.2 : 1.6)),
      marginLeft: space(spaceLv*(props.frameSize === 0 ? 1.6 : 1.2)), 
  })}

  return createStyles({
    root: props => ({
      ...frameWidthString(props),
      ...overflowRule(props),
      ...transitionConfig(props),
      backgroundColor: 'transparent', 
      flexGrow: 1,
      overflow: 'hidden',
      display: 'flex',
    }),
    boxSecond: props => ({
      ...overflowRule(props),
      ...transitionConfig(props),
      ...marginConfig(props),
      borderRadius: theme.spacing(props.spacingLv),
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows.frame,
    }),
    maintainInfo: {
      display: 'none',
      flexGrow: 1,
    },
  });
});

/**
 * 0:smalll, 1:medium, 2:large 
 * @param {*} props 
 * @returns 
 */
function Frame(props) {
  const [isEnlarge, setIsEnlarge] = useState(
    frameEnlargePass(props.allowMax, props.frameSize));
  const [isShrink, setIsShrink] = useState(
    frameShrinkPass(props.allowMin, props.frameSize));
  let frameWidth = frameWidthGiver(props.frameSize)

  const classes = useStyles({
    spacingLv: props.spacingLv,
    frameSize: props.frameSize,
    frameWidth: frameWidth,
  });

  const handleEnlarge = () => {
    props.moveEnlarge();
    /* handle Onclick import from parents components */
  };
  const handleShrink = () => {
    props.moveShrink();
    /* handle Onclick import from parents components */
  };

  const ChildWithProps = childPropsGiver(props.children, {
    frameSize: props.frameSize,
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
        frameSize={props.frameSize}
        frameWidth={frameWidth}
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
      {' / frameWidth: '}{`${frameWidth}%`},
      {' / frameSize: '}{`${props.frameSize}`},
      {' / allowMax: '}{String(props.allowMax)},
      {' / allowMin: '}{String(props.allowMin)},
      {' / index: '}{String(props.index)},
      {' / frameTitleLabel: '}{String(props.frameTitleLabel)},
      {' / searchInputShow: '}{String(props.searchInputShow)},
      {' / buttonCustomShow: '}{String(props.buttonCustomShow)},
    </Typography>
  );

  const frameSizeChange = () => {
    setIsEnlarge(
      frameEnlargePass(props.allowMax, props.frameSize));
    setIsShrink(
      frameShrinkPass(props.allowMin, props.frameSize));
  };
  useEffect(frameSizeChange, [
    props.allowMax, props.allowMin, props.frameSize]);

  return (
    <Box
      className={classes.root}
      key={props.indexForFrame}
      component="section"
    >
      <Box className={classes.boxSecond} >
        <MaintainInfo {...props} />
        {ChildWithProps}
      </Box>
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
