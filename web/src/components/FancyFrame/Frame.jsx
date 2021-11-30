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
import {
  frameWidthGiver, frameEnlargePass, frameShrinkPass, childPropsGiver
} from './FrameFunctions';

const useStyles = makeStyles(theme => createStyles({ // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  root: props => (
    {
      top: 0,
      width: `${props.frameWidth
        }%`,
      // backgroundColor: theme.palette.primary.dark,
      // color: theme.palette.primary.contrastText,
      zIndex: props.zIndex,
      overflow: 'hidden',
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  ),
  paper: props => (
    {
      // display: props.frameWidth < 30 ? 'none' : 'block',
      overflow: props.frameWidth < 30 ? 'hidden' : 'none',
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      height: `calc(100% - ${2 * theme.spacing(props.spacingLv)
        }px)`,
      marginTop: theme.spacing(props.spacingLv),
      marginBottom: theme.spacing(props.spacingLv),
      marginRight: theme.spacing(
        // props.spacingLv * ( props.frameSize===1 ? 1/2 : 1 )
        props.spacingLv * 1 / 2
      ),
      marginLeft: theme.spacing(
        // props.spacingLv * ( props.frameSize===0 ? 1/2 : 1 )
        props.spacingLv * 1 / 2
      ),
      borderRadius: `${theme.spacing(props.spacingLv)
        }px !important`
    }
  )

}));


// React.Children.map is not Array.property.map

function Frame(props) { // 0:smalll, 1:medium, 2:large
  const frameSize = props.frameSize;
  const [isEnlarge, setIsEnlarge] = useState(frameEnlargePass(props.allowMax, frameSize));
  const [isShrink, setIsShrink] = useState(frameShrinkPass(props.allowMin, frameSize));

  const propsStyled = {
    spacingLv: props.spacingLv,
    frameSize: frameSize,
    frameWidth: frameWidthGiver(frameSize),
    // zIndex: 1011,
  };
  const classes = useStyles(propsStyled);

  const handleEnlarge = () => {
    props.moveEnlarge();
    // handle Onclick import from parents components
  };
  const handleShrink = () => {
    props.moveShrink();
    // handle Onclick import from parents components
  };

  const ChildWithProps = childPropsGiver(props.children, {
    frameSize: frameSize,
    spacingLv: props.spacingLv,
  });
  const ButtonWithProps = childPropsGiver(props.buttonCustom, {
    className: classes.Button,
    spacingLv: props.spacingLv,
  });
  const MaintainInfo = props => (
    <Typography component="p" variant="body1">
      {' / isEnlarge: '}{String(isEnlarge)},
      {' / isShrink: '}{String(isShrink)},
      {' / spacing: '}{String(props.spacingLv)},
      {' / frameWidth: '}{`${frameWidthGiver(frameSize)}%`},
      {' / frameSize: '}{`${frameSize}`},
      {' / allowMax: '}{String(props.allowMax)},
      {' / allowMin: '}{String(props.allowMin)},
      {' / index: '}{String(props.index)},
      {' / label: '}{String(props.frameTitleLabel)},
      {' / isShowSearch: '}{String(props.searchInputShow)},
      {' / isShowCustom: '}{String(props.buttonCustomShow)},
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
    >
      <Paper variant="outlined"
        className={classes.paper}>
        <FrameBar
          buttonEnlargeShow={isEnlarge}
          buttonShrinkShow={isShrink}
          handleEnlarge={handleEnlarge}
          handleShrink={handleShrink}

          searchInputShow={props.searchInputShow}
          buttonCustomShow={props.buttonCustomShow}
          buttonCustom={ButtonWithProps}
          panelCustom={props.panelCustom}
          panelCustomShow={props.panelCustomShow}
          frameTitleLabel={props.frameTitleLabel}

          spacingLv={props.spacingLv}
          frameSize={frameSize}
          frameWidth={frameWidthGiver(frameSize)}
        />
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
  moveShrink: PropTypes.func.isRequired
};
Frame.defaultProps = {
  moveEnlarge: () => console.log('Enlarge'),
  moveShrink: () => console.log('Shrink'),
  frameSize: 1
}
export default Frame;
