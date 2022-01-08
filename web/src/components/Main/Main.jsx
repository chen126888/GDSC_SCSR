// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components

// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { renderFrames, selectFrame } from '../FancyFrame/FrameRenders';

const useStyles = makeStyles(theme => createStyles({
  root: {
    top: '15vh',
    height: '85vh',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper
  },
  maintainPanel: {
    display: 'none',
    zIndex: 1021,
    position: 'absolute',
  },
}));

function MainContent(props) {
  const classes = useStyles(props);
  let {
    frameIndex,
    frameDisplay,
    currentSelected,
    lastSelected,
    isSelectedEvent
  } = props.frameRenderRuleState;
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
  ), [
    allowSmall,
    currentSelected,
    data,
    frameDisplay,
    frameIndex,
    props.setFrameRenderRuleHook
  ]);
  /** useMemo is not useEffect, but dependecy logic is same */

  useEffect(() => {
    if ((currentSelected !== lastSelected) || isSelectedEvent) {
      let tmp = selectFrame(frameIndex, frameDisplay, currentSelected, allowSmall);
      props.setFrameRenderRuleHook({
        frameIndex: tmp.frameIndexNext,
        frameDisplay: tmp.frameDisplayNext,
        currentSelected: lastSelected,
        lastSelected: lastSelected,
        isSelectedEvent: false,
      });
    }
  }, [
    allowSmall,
    currentSelected,
    frameDisplay,
    frameIndex,
    isSelectedEvent,
    lastSelected,
    props
  ])

  const handleWidthChange = () => {
    console.log('Panel Respond:', props.frameRenderRuleState);
  };

  return (
    <main className={classes.root}>
      <Box className={classes.maintainPanel} >
        <ButtonGroup >
          <Button onClick={handleWidthChange} >
            ChangeWidth
          </Button>
        </ButtonGroup>
      </Box>
      {frameRender}
    </main>
  );
};
MainContent.propTypes = {
  frameRenderBaseObject: PropTypes.object.isRequired,
  frameRenderRuleState: PropTypes.object.isRequired,
  setFrameRenderRuleHook: PropTypes.func.isRequired,
};

export default MainContent;