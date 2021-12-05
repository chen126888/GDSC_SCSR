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
  // console.log(frameIndexArray, frameDisplayArray, selectedFrameNumber, allowSmallArray, "select");
  let leftFrameIndex = frameIndexArray[0];
  let rightFrameIndex = frameIndexArray[1];
  let frameDisplayNext = [...frameDisplayArray];
  let frameIndexNext = [...frameIndexArray];
  // console.log(leftFrameIndex, rightFrameIndex, "select")

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

const renderFrames = ({
  frameIndex, frameDisplay, currentSelected, data, allowSmall, setFrameRenderRuleHook
})=> {
  // console.log(frameIndex, frameDisplay, currentSelected, data, allowSmall, setFrameRenderRuleHook)
  return (
    frameIndex.map((indexForFrame, i) => {
      let {
        label, defaultDisplay, allowMax, allowMin, children,
        buttonCustom, buttonCustomShow, searchInputShow,
        panelCustom, panelCustomShow,
      } = data[indexForFrame];
      let sizeNumber = frameDisplay[indexForFrame];

      return (
        <Frame
          moveEnlarge={() => {
            // handleEnlarge
            let tmp = sizeEnlarge(frameIndex, frameDisplay, sizeNumber, allowSmall);
            setFrameRenderRuleHook({
              frameIndex: tmp.frameIndexNext,
              frameDisplay: tmp.frameDisplayNext,
              currentSelected: currentSelected,
              lastSelected: currentSelected,
              isSelectedEvent: false,
            });
          }}
          moveShrink={() => {
            // handleShrink
            let tmp = sizeShrink(frameIndex, frameDisplay, sizeNumber);
            setFrameRenderRuleHook({
              frameIndex: tmp.frameIndexNext,
              frameDisplay: tmp.frameDisplayNext,
              currentSelected: currentSelected,
              lastSelected: currentSelected,
              isSelectedEvent: false,
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