// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
import Frame from '../FancyFrame/Frame';
import { demoFrameData } from './dummyFrameChildren';
// import CourseTabs from '../CourseSelecter/CourseSheetTab';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import OpenInFullIcon from '@mui/icons-material/OpenInFull';
// import SearchIcon from '@mui/icons-material/Search';
// Hooks and Function
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';

const useStyles = makeStyles(theme => createStyles({
  root: {
    top: '25vh',
    height: '75vh',
    width: '100%',
    position: 'absolute',
  },
  frameContainer: {
    // zIndex: 1001,
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

const getFrameProps = (frameSet, checkTgt) => frameSet.map((value, i) => (
  checkTgt === 'index' ? i : value[checkTgt]
));
const checkFrameAllow = (frameSet, checkTgt) => {
  let tmpArray = [];
  // const range = (min, max) => [...Array(max-min).keys()].map ((value, i) => (min+i));
  frameSet.map((value, i) => [value.allowMin, value.allowMax]).map((value, i) => {
    switch (checkTgt) {
      case 'small':
        if (value[0] === 0) { tmpArray.push(i) }
        break;
      case 'fullscreen':
        if (value[1] === 2) { tmpArray.push(i) }
        break;
      default:
        tmpArray.add(i) // all frames has medium size
    };
  });
  return tmpArray;
};

// Size Control
const sizeShrink = props => {
  // leftFrame used
  let [leftFrameIndex, rightFrameIndex, ...other] = props.frameIndexArray;
  console.log((props.frameSizeNumber === 1) ? 'ShrinkToSmall' : 'ShrinkToMedium');

  let frameDisplayNext = [...props.frameDisplayArray];
  frameDisplayNext[leftFrameIndex] = (props.frameSizeNumber === 1) ? 0 : 1;
  frameDisplayNext[rightFrameIndex] = (props.frameSizeNumber === 1) ? 1 : 0;

  let frameIndexNext = (props.frameSizeNumber === 1) ? [
    rightFrameIndex, leftFrameIndex, ...other
  ] : [...props.frameIndexArray];

  return { frameIndexNext, frameDisplayNext }
  // ShrinkToSmall
  // index interchange between 2 current frame
  // -------------
  // ShrinkToMedium
  // no index interchange
};

const sizeEnlarge = props => {
  let [leftFrameIndex, rightFrameIndex, ...other] = props.frameIndexArray;
  console.log((props.frameSizeNumber === 1) ? 'EnlargeToFullScreen' : 'EnlargeToMedium');

  let newSmallAllow = (props.allowSmallArray.filter(i => i !== rightFrameIndex))[
    Math.floor(Math.random() * (props.allowSmallArray.length - 1))
  ];

  let frameDisplayNext = [...props.frameDisplayArray];
  frameDisplayNext[leftFrameIndex] = (props.frameSizeNumber === 1) ? 2 : -1;
  frameDisplayNext[rightFrameIndex] = (props.frameSizeNumber === 1) ? -1 : 1;
  frameDisplayNext[newSmallAllow] = (props.frameSizeNumber === 1) ? frameDisplayNext[newSmallAllow] : 0;

  let frameIndexNext = (props.frameSizeNumber === 1) ? [
    ...props.frameIndexArray
  ] : [
    rightFrameIndex, newSmallAllow, ...props.frameIndexArray.filter(
      i => ((i !== newSmallAllow) && (i !== rightFrameIndex))
    )
  ];

  return { frameIndexNext, frameDisplayNext }
  // EnlargeToFullScreen
  // right disapear
  // left to fullscreen
  // no index interchange
  // --------------
  // EnlargeToMedium
  // original leftFrame disappear
  // right to left
  // summon newSmallAllow as new right 
  // [(0 ,1), 2, 3] -> [(1), 2, 3, 0] -> [(1, 3), 2, 0]
};

const selectFrame = props => {
  let [leftFrameIndex, rightFrameIndex, ...other] = props.frameIndexArray;

  let frameDisplayNext = [...props.frameDisplayArray];
  let frameIndexNext = [...props.frameIndexArray];
  console.log(`handleFrameSelect with ${props.selectedFrameNumber}`);
  console.log(
    'Select Respond:',
    props.frameIndexArray, 
    props.frameDisplayArray, 
    props.lastSelectedNumber,
    props.selectedFrameNumber
    );
  console.log('left,right,...other',leftFrameIndex, rightFrameIndex, other);

  if (props.selectedFrameNumber === leftFrameIndex) {
    // nothing to do
    console.log('the selected Frame is already in leftFrame.');

  } else if (props.selectedFrameNumber === rightFrameIndex) {
    console.log('the selected Frame is right now to left.');
    let tmp = sizeEnlarge({
      frameIndexArray: props.frameIndexArray,
      frameDisplayArray: props.frameDisplayArray,
      frameSizeNumber: 0,
      allowSmallArray: props.allowSmallArray
    });
    frameIndexNext = tmp.frameIndexNext;
    frameDisplayNext = tmp.frameDisplayNext;
    // props.setFrameIndexHook(tmp.frameIndexNext);
    // props.setFrameDisplayHook(tmp.frameDisplayNext);
    // console.log(tmp.frameIndexNext, tmp.frameDisplayNext);

  } else {
    if (props.allowSmallArray.includes(leftFrameIndex)) {
      console.log('the left Frame can shrink.');
      // Original leftFrame is small allow
      frameDisplayNext[props.selectedFrameNumber] = 1
      frameDisplayNext[leftFrameIndex] = 0; // frameIndexArray[0]
      frameDisplayNext[rightFrameIndex] = -1; // frameIndexArray[1]

      frameIndexNext = [
        props.selectedFrameNumber, leftFrameIndex, ...props.frameIndexArray.filter(
          i => (i !== props.selectedFrameNumber) && (i !== leftFrameIndex)
        )
      ];

    } else {
      // Original leftFrame is not small allow
      console.log('the left Frame is discarded.');
      frameDisplayNext[props.selectedFrameNumber] = 1
      frameDisplayNext[leftFrameIndex] = -1

      frameIndexNext = [
        props.selectedFrameNumber, ...props.frameIndexArray.filter(
          i => (i !== props.selectedFrameNumber)
        )
      ];

    };
  };
  return { frameIndexNext, frameDisplayNext }
};


const renderFrames = props => {
  console.log(
    'Render Respond:',
    props.frameIndexArray, 
    props.frameDisplayArray, 
    props.lastSelectedNumber,
    props.selectedFrameNumber
    );
  if (props.selectedFrameNumber === props.lastSelectedNumber) {
    console.log('Not Select Frame activated');
    // selectedFrameNumber: props.selectedFrame,
    // lastSelectedNumber: lastSelected,
  } else {
    console.log('Select Frame activated');
    props.setLastSelectedHook(props.selectedFrameNumber);
    let tmp = selectFrame({
        frameIndexArray: props.frameIndexArray,
        frameDisplayArray: props.frameDisplayArray,
        allowSmallArray: props.allowSmallArray,
        selectedFrameNumber: props.selectedFrameNumber,
    });
    props.setFrameIndexHook(tmp.frameIndexNext);
    props.setFrameDisplayHook(tmp.frameDisplayNext);
    // selectFrame(props);
  }

  return (
    props.frameIndexArray.map((indexForFrame, i) => {
      let {
        label, defaultDisplay, allowMax, allowMin, children, 
        buttonCustom, buttonCustomShow, searchInputShow
      } = props.frameDataArray[indexForFrame];
      let sizeNumber = props.frameDisplayArray[indexForFrame];

      return (
        <Frame
          moveEnlarge={() => {
            // handleEnlarge
            let tmp = sizeEnlarge({
              frameIndexArray: props.frameIndexArray,
              frameDisplayArray: props.frameDisplayArray,
              frameSizeNumber: sizeNumber,
              allowSmallArray: props.allowSmallArray
            });
            props.setFrameIndexHook(tmp.frameIndexNext);
            props.setFrameDisplayHook(tmp.frameDisplayNext);
            console.log(
              'Enlarge Respond:',
              props.frameIndexArray, 
              props.frameDisplayArray, 
              props.lastSelectedNumber,
              props.selectedFrameNumber
              );
            console.log(tmp.frameIndexNext, tmp.frameDisplayNext);
          }}
          moveShrink={() => {
            // handleShrink
            let tmp = sizeShrink({
              frameIndexArray: props.frameIndexArray,
              frameDisplayArray: props.frameDisplayArray,
              frameSizeNumber: sizeNumber,
            });
            props.setFrameIndexHook(tmp.frameIndexNext);
            props.setFrameDisplayHook(tmp.frameDisplayNext);
            console.log(
              'Shrink Respond:',
              props.frameIndexArray, 
              props.frameDisplayArray, 
              props.lastSelectedNumber,
              props.selectedFrameNumber
              );
            console.log(tmp.frameIndexNext, tmp.frameDisplayNext);
          }}
          index={indexForFrame}
          key={i}

          frameTitleLabel={label}
          frameSize={sizeNumber}
          allowMax={allowMax}
          allowMin={allowMin}
          defaultDisplay={defaultDisplay}

          buttonCustom={buttonCustom}
          searchInputShow={searchInputShow}
          buttonCustomShow={buttonCustomShow}
          spacingLv={2}
        >
          {/* test */}
          {children}
        </Frame>
      )
    })
  )
};

function MainContent(props) {
  const classes = useStyles(props);
  // let frameSet = props.frameSet;
  let frameData = demoFrameData;
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
    frameData, frameIndex, frameDisplay, allowSmall, props.selectedFrame, lastSelected
  ]);
  
  // useEffect(() => selectFrame({
  //   frameIndexArray: frameIndex,
  //   frameDisplayArray: frameDisplay,
  //   allowSmallArray: allowSmall,
  //   selectedFrameNumber: props.selectedFrame,
  //   setFrameIndexHook: setFrameIndex,
  //   setFrameDisplayHook: setFrameDisplay,
  // }),[
  //   props.selectedFrame
  // ]);

  const handleWidthChange = () => {
    console.log('Panel Respond:', frameIndex, frameDisplay, lastSelected, props.selectedFrame);
  };

  return (
    <main className={classes.root}>
      {frameIndex}
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