// Material Components

// Main Components
import Frame from '../FancyFrame/Frame';

// Styles

// Hooks and Function

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
const sizeShrink = (
  frameIndexArray, frameDisplayArray, frameSizeNumber
) => {
  let [leftFrameIndex, rightFrameIndex, ...other] = frameIndexArray;

  let frameIndexNext = (frameSizeNumber === 1) ? [
    rightFrameIndex, leftFrameIndex, ...other
  ] : [
    ...frameIndexArray
  ];

  let frameDisplayNext = [...frameDisplayArray];
  [1, 0, -1, -1].forEach((sizeForFrame, i) => {
    frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
  });

  return { frameIndexNext, frameDisplayNext }
};

const sizeEnlarge = (
  frameIndexArray, frameDisplayArray, frameSizeNumber, allowSmallArray
) => {
  let rightFrameIndex = frameIndexArray[1];
  let newSmallAllow = (allowSmallArray.filter(i => i !== rightFrameIndex))[
    Math.floor(Math.random() * (allowSmallArray.length - 1))
  ];

  let frameIndexNext = (frameSizeNumber === 1) ? [
    ...frameIndexArray
  ] : [
    rightFrameIndex, newSmallAllow, ...frameIndexArray.filter(
      i => ((i !== newSmallAllow) && (i !== rightFrameIndex))
    )
  ];

  let frameDisplayNext = [...frameDisplayArray];
  ((frameSizeNumber === 1) ? [2, -1, -1, -1] : [1, 0, -1, -1]).forEach(
    (sizeForFrame, i) => {
      frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
    });

  return { frameIndexNext, frameDisplayNext }
};

// Frame select
const selectFrame = (
  frameIndexArray, frameDisplayArray, selectedFrameNumber, allowSmallArray
) => {
  console.log(frameIndexArray, frameDisplayArray, selectedFrameNumber, allowSmallArray)
  let leftFrameIndex = frameIndexArray[0];
  let rightFrameIndex = frameIndexArray[1];
  let frameDisplayNext = [...frameDisplayArray];
  let frameIndexNext = [...frameIndexArray];

  if (selectedFrameNumber === leftFrameIndex) {
    // nothing to do

  } else if (selectedFrameNumber === rightFrameIndex) {
    let tmp = sizeEnlarge(
      frameIndexArray, frameDisplayArray, 0, allowSmallArray
    );
    frameIndexNext = tmp.frameIndexNext;
    frameDisplayNext = tmp.frameDisplayNext;


  } else {
    if (allowSmallArray.includes(leftFrameIndex)) {
      // Original leftFrame is small allow
      frameIndexNext = [
        selectedFrameNumber, ...frameIndexArray.filter(
          i => (i !== selectedFrameNumber)
        )];

    } else {
      // Original leftFrame is not small allow
      frameIndexNext = [
        selectedFrameNumber, rightFrameIndex, ...frameIndexArray.filter(
          i => ((i !== selectedFrameNumber) && (i !== rightFrameIndex))
        )];
    };

    [1, 0, -1, -1].forEach((sizeForFrame, i) => {
      frameDisplayNext[frameIndexNext[i]] = sizeForFrame;
    });
  };
  return { frameIndexNext, frameDisplayNext }
};

const renderFrames = props => {
  let { frameIndex, display, currentSelected, lastSelected } = props.frameRenderRuleState;
  let { data, allowSmall } = props.frameRenderBaseObject;

  console.log(
    'Render Respond:',
    frameIndex, display,
    '->',
    currentSelected
  );
  // handleSelect
  if ((currentSelected === lastSelected)) {
    console.log('Not Select Frame activated');
    // selectedFrameNumber: props.selectedFrame,
    // lastSelectedNumber: lastSelected,
  } else {
    console.log('Select Frame activated');

    let tmp = selectFrame(frameIndex, display, currentSelected, allowSmall);
    props.setFrameRenderRuleHook({
      frameIndex: tmp.frameIndexNext,
      display: tmp.frameDisplayNext,
      currentSelected: currentSelected,
      lastSelected: currentSelected,
    });
  };

  return (
    frameIndex.map((indexForFrame, i) => {
      let {
        label, defaultDisplay, allowMax, allowMin, children,
        buttonCustom, buttonCustomShow, searchInputShow,
        panelCustom, panelCustomShow,
      } = data[indexForFrame];
      let sizeNumber = display[indexForFrame];

      return (
        <Frame
          moveEnlarge={() => {
            // handleEnlarge
            let tmp = sizeEnlarge(frameIndex, display, sizeNumber, allowSmall);
            props.setFrameRenderRuleHook({
              frameIndex: tmp.frameIndexNext,
              display: tmp.frameDisplayNext,
              currentSelected: indexForFrame,
              lastSelected: currentSelected,
            });
            console.log(
              'Enlarge Respond:',
              props.frameIndexArray,
              props.frameDisplayArray,
              props.lastSelectedNumber,
              '->',
              props.selectedFrameNumber
            );
            console.log(tmp.frameIndexNext, tmp.frameDisplayNext);
          }}
          moveShrink={() => {
            // handleShrink
            let tmp = sizeShrink(frameIndex, display, sizeNumber);
            props.setFrameRenderRuleHook({
              frameIndex: tmp.frameIndexNext,
              display: tmp.frameDisplayNext,
              currentSelected: indexForFrame,
              lastSelected: currentSelected,
            });
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