// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
import { demoFrameData } from './dummyChildren';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';

// Hooks and Function
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { getFrameProps, checkFrameAllow, renderFrames } from './FrameRenders';

const useStyles = makeStyles(theme => createStyles({
  root: {
    top: '25vh',
    height: '75vh',
    width: '100%',
    position: 'absolute',
  },
  frameContainer: {
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  maintainPanel: {
    zIndex: 1021,
    position: 'absolute',
  },
  buttonCommon: {
    color: 'white !important',
    // color: theme.palette.primary.contrastText,
    height: '100%',
  },

}));

function MainContent(props) {
  const classes = useStyles(props);
  let frameData = props.frameData;
  // let frameData = demoFrameData;
  let allowSmall = checkFrameAllow(frameData, 'small');
  // let allowFullScreen = checkFrameAllow(frameData, 'fullscreen');

  const [frameIndex, setFrameIndex] = useState(getFrameProps(frameData, 'index'));
  // [ (0:'登記課表', 1:'備選清單'), 2:'課程搜尋', 3:'課程地圖']
  // Decide the Arrangement of Stack

  const [frameDisplay, setFrameDisplay] = useState(getFrameProps(frameData, 'defaultDisplay'));
  // [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']
  // Decide the size of each frame

  const [lastSelected, setLastSelected] = useState(1);
  // Assist to recongnize whether select Frame be active

  const frameRender = useMemo(() => renderFrames({
    frameDataArray: frameData,
    frameIndexArray: frameIndex,
    frameDisplayArray: frameDisplay,
    allowSmallArray: allowSmall,
    selectedFrameNumber: props.selectedFrame,
    lastSelectedNumber: lastSelected,
    setFrameIndexHook: setFrameIndex,
    setFrameDisplayHook: setFrameDisplay,
    setLastSelectedHook: setLastSelected,
  }), [
    frameData,
    frameIndex, 
    frameDisplay, 
    allowSmall, 
    props.selectedFrame, 
    lastSelected,
  ]);
  // 整合3個UseState

  const handleWidthChange = () => {
    console.log('Panel Respond:', frameIndex, frameDisplay, lastSelected, props.selectedFrame);
  };

  return (
    <main className={classes.root}>
      <ButtonGroup className={classes.maintainPanel} >
        <Button
          onClick={handleWidthChange}
        >
          ChangeWidth
        </Button>
      </ButtonGroup>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'background.paper',
        }}
        className={classes.frameContainer}
      >
        {/* {DummyFrameFive} */}
        {frameRender}
      </Box>
    </main>
  );
};
MainContent.propTypes = {
  selectedFrame: PropTypes.number,
};
MainContent.defaultProps = {
  frameSet: demoFrameData,
}

export default MainContent;