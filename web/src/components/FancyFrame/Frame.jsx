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
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// 1. Click Header buttons, if can shrink, then shrink, otherwise be repalced.
// 2. Click enlarge button in small frame, 
//    left one enlarging to replace right one and call anther one small frame at oringnal palce.

// 2: large: 備選清單、課程搜尋
// 1: medium: 備選清單、課程搜尋、課程地圖、登記課表
// 0: small: 備選清單、課程地圖

const useStyles = makeStyles( theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => ({
    top: 0,
    width: props.frameWidth,
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
      props.spacingLv * ( props.frameSize===1 ? 1/2 : 1 )
    ),
    marginLeft: theme.spacing(
      props.spacingLv * ( props.frameSize===0 ? 1/2 : 1 )
    ),
    borderRadius: `${theme.spacing(props.spacingLv)}px !important`,
  }),

}) );

const frameWidthGiver = size => `${-5*size**2 + 45*size + 30}%`;
  // 0 -> 30, 1 -> 70, 2 -> 100
const frameEnlargePass = (allowMax, currentSize) => (currentSize < allowMax);
const frameShrinkPass = (allowMin, currentSize) => (currentSize > allowMin);
  // return { isEnlarge, isShrink }

function Frame (props) {
  const [ frameSize, setFrameSize ] = useState(1); // 0:smalll, 1:medium, 2:large
  const [ isEnlarge, setIsEnlarge ] = useState(frameEnlargePass(props.allowMax, frameSize));
  const [ isShrink, setIsShrink ] = useState(frameShrinkPass(props.allowMin, frameSize));
  
  const propsStyled = {
    spacingLv: props.spacingLv,
    frameSize: frameSize,
    frameWidth: frameWidthGiver(frameSize), 
    zIndex: 1011,
  };

  const handleEnlarge = () => setFrameSize( isEnlarge ? frameSize+1 : frameSize);
  const handleShrink = () => setFrameSize( isShrink ? frameSize-1 : frameSize);


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
        elevation={8}
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
        />
          <Typography component="p" variant="p" display="flex">
            {'isEnlarge: '}{String(isEnlarge)} 
            {' / isShrink: '}{String(isShrink)} 
            {' / spacing: '}{String(props.spacingLv)} 
            {' / frameWidth: '}{frameWidthGiver(frameSize)}
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
};

export default Frame;