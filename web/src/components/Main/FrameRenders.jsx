// Material Components

// Main Components
import Frame from '../FancyFrame/Frame';

// Styles

// Hooks and Function
// import { useEffect } from 'react';

const getFrameProps = (frameSet, checkTgt) => frameSet.map((value, i) => (
  checkTgt === 'index' ? i : value[checkTgt]
));
const checkFrameAllow = (frameSet, checkTgt) => {
  let tmpArray = [];
  frameSet.map((value, i) => [value.allowMin, value.allowMax]).forEach((value, i) => {
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
  // console.log((props.frameSizeNumber === 1) ? 'ShrinkToSmall' : 'ShrinkToMedium');

  let frameIndexNext = (props.frameSizeNumber === 1) ? [
    rightFrameIndex, leftFrameIndex, ...other
  ] : [
    ...props.frameIndexArray
  ];

  let frameDisplayNext = [...props.frameDisplayArray];
  [1, 0, -1, -1].forEach((sizeForFrame, i) => {
    frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
    // console.log(frameIndexNext[i], 'with size', sizeForFrame);
  });

  return { frameIndexNext, frameDisplayNext }
  // ShrinkToSmall
  // index interchange between 2 current frame
  // -------------
  // ShrinkToMedium
  // no index interchange
};

const sizeEnlarge = props => {
  // let [leftFrameIndex, rightFrameIndex, ...other] = props.frameIndexArray;
  let rightFrameIndex = props.frameIndexArray[1];
  // console.log((props.frameSizeNumber === 1) ? 'EnlargeToFullScreen' : 'EnlargeToMedium');

  let newSmallAllow = (props.allowSmallArray.filter(i => i !== rightFrameIndex))[
    Math.floor(Math.random() * (props.allowSmallArray.length - 1))
  ]; // logic proved

  let frameIndexNext = (props.frameSizeNumber === 1) ? [
    ...props.frameIndexArray
  ] : [
    rightFrameIndex, newSmallAllow, ...props.frameIndexArray.filter(
      i => ((i !== newSmallAllow) && (i !== rightFrameIndex))
    )
  ];

  let frameDisplayNext = [...props.frameDisplayArray];
  ((props.frameSizeNumber === 1) ? [2, -1, -1, -1] : [1, 0, -1, -1]).forEach((sizeForFrame, i) => {
    frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
    // console.log(frameIndexNext[i], 'with size', sizeForFrame);
  });

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
  let leftFrameIndex = props.frameIndexArray[0];
  let rightFrameIndex = props.frameIndexArray[1];
  let frameDisplayNext = [...props.frameDisplayArray];
  let frameIndexNext = [...props.frameIndexArray];
  // console.log(`handleFrameSelect with ${props.selectedFrameNumber}`);
  // console.log(
  //   'Select Respond:',
  //   props.frameIndexArray,
  //   props.frameDisplayArray,
  //   props.allowSmallArray,
  //   props.selectedFrameNumber
  // );
  // console.log('left,right,...other', leftFrameIndex, rightFrameIndex, other);

  if (props.selectedFrameNumber === leftFrameIndex) {
    // nothing to do
    // console.log('the selected Frame is already in leftFrame.');

  } else if (props.selectedFrameNumber === rightFrameIndex) {
    // console.log('the selected Frame is right now to left.');
    let tmp = sizeEnlarge({
      frameIndexArray: props.frameIndexArray,
      frameDisplayArray: props.frameDisplayArray,
      frameSizeNumber: 0,
      allowSmallArray: props.allowSmallArray
    });
    frameIndexNext = tmp.frameIndexNext;
    frameDisplayNext = tmp.frameDisplayNext;

  } else {
    if (props.allowSmallArray.includes(leftFrameIndex)) {
      // Original leftFrame is small allow
      // console.log('the left Frame can shrink.');
      frameIndexNext = [
        props.selectedFrameNumber, ...props.frameIndexArray.filter(
          i => (i !== props.selectedFrameNumber)
        )
      ];

    } else {
      // Original leftFrame is not small allow
      // console.log('the left Frame will discard.');
      frameIndexNext = [
        props.selectedFrameNumber, rightFrameIndex, ...props.frameIndexArray.filter(
          i => ((i !== props.selectedFrameNumber) && (i !== rightFrameIndex))
        )
      ];

    };
    [1, 0, -1, -1].forEach((sizeForFrame, i) => {
      frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
      // console.log(frameIndexNext[i], 'with size', sizeForFrame);
    });

  };
  return { frameIndexNext, frameDisplayNext }
};

const renderFrames = props => {
  console.log(
    'Render Respond:',
    props.frameIndexArray,
    props.frameDisplayArray,
    props.lastSelectedNumber,
    '->',
    props.selectedFrameNumber
  );


  // handleSelect
  if (props.selectedFrameNumber === props.lastSelectedNumber) {
    // console.log('Not Select Frame activated');
    // selectedFrameNumber: props.selectedFrame,
    // lastSelectedNumber: lastSelected,
  } else {
    // console.log('Select Frame activated');

    let tmp = selectFrame({
      frameIndexArray: props.frameIndexArray,
      frameDisplayArray: props.frameDisplayArray,
      allowSmallArray: props.allowSmallArray,
      selectedFrameNumber: props.selectedFrameNumber,
    });
    props.setFrameIndexHook(tmp.frameIndexNext);
    props.setFrameDisplayHook(tmp.frameDisplayNext);
    props.setLastSelectedHook(props.selectedFrameNumber);
    // selectFrame(props);
  };

  return (
    props.frameIndexArray.map((indexForFrame, i) => {
      let {
        label, defaultDisplay, allowMax, allowMin, children,
        buttonCustom, buttonCustomShow, searchInputShow,
        panelCustom, panelCustomShow,
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
            // console.log(
            //   'Enlarge Respond:',
            //   props.frameIndexArray,
            //   props.frameDisplayArray,
            //   props.lastSelectedNumber,
            //   '->',
            //   props.selectedFrameNumber
            // );
            // console.log(tmp.frameIndexNext, tmp.frameDisplayNext);
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
            // console.log(
            //   'Shrink Respond:',
            //   props.frameIndexArray,
            //   props.frameDisplayArray,
            //   props.lastSelectedNumber,
            //   '->',
            //   props.selectedFrameNumber
            // );
            // console.log(tmp.frameIndexNext, tmp.frameDisplayNext);
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
          panelCustom={panelCustom}
          panelCustomShow={panelCustomShow}

          children={children}
          spacingLv={2}
        >
        </Frame>
      )
    })
  )
};

export { getFrameProps, checkFrameAllow, sizeShrink, sizeEnlarge, selectFrame, renderFrames }