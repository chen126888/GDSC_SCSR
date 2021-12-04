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
import { useMemo } from 'react';
import { renderFrames } from './FrameRenders';

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

  const frameRender = useMemo(() => renderFrames({
    frameRenderBaseObject: props.frameRenderBaseObject,
    frameRenderRuleState: props.frameRenderRuleState,
    setFrameRenderRuleHook: props.setFrameRenderRuleHook,
  }), [props.frameRenderBaseObject, props.frameRenderRuleState, props.setFrameRenderRuleHook]);

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