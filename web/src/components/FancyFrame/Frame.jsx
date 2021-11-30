// Material Components
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
// Main Components
import FrameBar from './FrameBar';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
// import clsx from 'clsx';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles( theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    top: 0,
    width: `${props.frameWidth}%`,
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
    // display: props.frameWidth < 30 ? 'none' : 'block',
    overflow: props.frameWidth < 30 ? 'hidden' : 'none',
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100% - ${2*theme.spacing(props.spacingLv)}px)`,
    marginTop: theme.spacing(props.spacingLv),
    marginBottom: theme.spacing(props.spacingLv),
    marginRight: theme.spacing(
      // props.spacingLv * ( props.frameSize===1 ? 1/2 : 1 )
      props.spacingLv * 1/2
    ),
    marginLeft: theme.spacing(
      // props.spacingLv * ( props.frameSize===0 ? 1/2 : 1 )
      props.spacingLv * 1/2
    ),
    borderRadius: `${theme.spacing(props.spacingLv)}px !important`,
  }),

}) );

const frameWidthGiver = size => (size >= 0 ? (-5*size**2 + 45*size + 30) : 0);
  // 0 -> 30, 1 -> 70, 2 -> 100
const frameEnlargePass = (allowMax, currentSize) => (currentSize < allowMax);
const frameShrinkPass = (allowMin, currentSize) => (currentSize > allowMin);
  // return { isEnlarge, isShrink }

function Frame (props) {
  // const [ frameSize, setFrameSize ] = useState(props.frameSize); 
  // 0:smalll, 1:medium, 2:large
  const frameSize = props.frameSize;
  const [ isEnlarge, setIsEnlarge ] = useState(frameEnlargePass(props.allowMax, frameSize));
  const [ isShrink, setIsShrink ] = useState(frameShrinkPass(props.allowMin, frameSize));

  const propsStyled = {
    spacingLv: props.spacingLv,
    frameSize: frameSize,
    frameWidth: frameWidthGiver(frameSize), 
    // zIndex: 1011,
  };

  const handleEnlarge = () => {
    props.moveEnlarge();
    // setFrameSize( isEnlarge ? frameSize+1 : frameSize);
  };
  const handleShrink = () => {
    props.moveShrink();
    // setFrameSize( isShrink ? frameSize-1 : frameSize);
  };


  const frameSizeChange = () => {
    setIsEnlarge(frameEnlargePass(props.allowMax, frameSize));
    setIsShrink(frameShrinkPass(props.allowMin, frameSize));
  };
  useEffect(frameSizeChange ,[props.allowMax, props.allowMin, frameSize]);

  const classes = useStyles(propsStyled);

  return (
    <Box className={classes.root} >
      <Paper
        variant="outlined"
        className={classes.paper}
      >
        <FrameBar
          buttonEnlargeShow={isEnlarge}
          buttonShrinkShow={isShrink}
          handleEnlarge={handleEnlarge}
          handleShrink={handleShrink}

          searchInputShow={props.isShowSearch}
          buttonCustomShow={props.isShowCustom}
          buttonCustom={props.buttonCustom}
          frameTitleLabel={props.frameTitleLabel}

          spacingLv={props.spacingLv}
          frameSize={frameSize}
          frameWidth={frameWidthGiver(frameSize)}
        />
        <Typography component="p" variant="body1">
          {'isEnlarge: '}{String(isEnlarge)} 
          {' / isShrink: '}{String(isShrink)} 
          {' / spacing: '}{String(props.spacingLv)} 
          {' / frameWidth: '}{`${frameWidthGiver(frameSize)}%`}
          {' / frameSize: '}{`${frameSize}`}
          {' / allowMax: '}{props.allowMax}
          {' / allowMin: '}{props.allowMin}
          {' / index: '}{props.index}
          {' / label: '}{props.frameTitleLabel}
        </Typography>
        {props.children}
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
};
Frame.defaultProps = {
  moveEnlarge: () => console.log('Enlarge'),
  moveShrink: () => console.log('Shrink'),
  frameSize: 1,
}
export default Frame;