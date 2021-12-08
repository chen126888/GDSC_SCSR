// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';

// Hooks and Function
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { renderFrames, selectFrame } from '../FancyFrame/FrameRenders';

const useStyles = makeStyles(theme => createStyles({
  root: {
    top: '25vh',
    height: '75vh',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
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
  let { frameIndex, frameDisplay, currentSelected, lastSelected, isSelectedEvent } = props.frameRenderRuleState;
  let { data, allowSmall } = props.frameRenderBaseObject;
  const frameRender = useMemo(() => (
    renderFrames({
      frameIndex: frameIndex, 
      frameDisplay: frameDisplay, 
      currentSelected: currentSelected,
      data: data, 
      allowSmall: allowSmall,
      setFrameRenderRuleHook: props.setFrameRenderRuleHook,
    })
  ), [allowSmall, currentSelected, data, frameDisplay, frameIndex, props.setFrameRenderRuleHook]); 
  // useMemo is not useEffect, but dependecy logic is same

  useEffect(() => {
    if ((currentSelected !== lastSelected) || isSelectedEvent) {
      // console.log('Select Frame activated');
      let tmp = selectFrame(frameIndex, frameDisplay, currentSelected, allowSmall);
      props.setFrameRenderRuleHook({
        frameIndex: tmp.frameIndexNext,
        frameDisplay: tmp.frameDisplayNext,
        currentSelected: lastSelected,
        lastSelected: lastSelected,
        isSelectedEvent: false,
      });
    } else {
      // console.log('Not Select Frame activated');
    }
  }, [allowSmall, currentSelected, frameDisplay, frameIndex, isSelectedEvent, lastSelected, props])

  const handleWidthChange = () => {
    console.log('Panel Respond:', props.frameRenderRuleState);
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
  frameRenderBaseObject: PropTypes.object.isRequired,
  frameRenderRuleState: PropTypes.object.isRequired,
  setFrameRenderRuleHook: PropTypes.func.isRequired,
};

export default MainContent;