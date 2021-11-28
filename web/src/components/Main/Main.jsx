// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
import Frame from '../FancyFrame/Frame';
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
import { useState } from 'react';

const useStyles = makeStyles( theme => createStyles({
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

}) );

const DummyFrameChild = props => (
  <div {...props}>
    It's dummy child
  </div>
);
const DummyCustomButton = props => (
  <Button>
    <MinimizeIcon></MinimizeIcon>
  </Button>
);

var demoFrameSet = [
  {
    label: '登記課表',
    defaultDisplay: 1,
    allowMax: 1,
    allowMin: 1,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ],
    buttonCustomShow: true,
    searchInputShow: true,
  },{
    label: '備選清單',
    defaultDisplay: 0,
    allowMax: 2,
    allowMin: 0,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ],
    buttonCustomShow: true,
    searchInputShow: true,
  },{
    label: '課程搜尋',
    defaultDisplay: -1,
    allowMax: 2,
    allowMin: 1,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ],
    buttonCustomShow: true,
    searchInputShow: true,
  },{
    label: '課程地圖',
    defaultDisplay: -1,
    allowMax: 2,
    allowMin: 0,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ],
    buttonCustomShow: true,
    searchInputShow: true,
  },
];
// [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']

function MainContent (props) {
  const classes = useStyles(props);
  const getFrameProps = (frameSet, checkTgt) => frameSet.map((value, i) => (
    checkTgt === 'index' ? i : value[checkTgt]
  ));
  const checkFrameAllow = (frameSet, checkTgt) => {
    let tmpArray = new Array;
    // const range = (min, max) => [...Array(max-min).keys()].map ((value, i) => (min+i));
    frameSet.map((value, i) => [value.allowMin, value.allowMax]).map((value, i) => {
      switch (checkTgt) {
        case 'small': 
          if (value[0] === 0) { tmpArray.add(i) }
          break;
        case 'fullscreen': 
          if (value[1] === 2) { tmpArray.add(i) }
          break;
        default:
          tmpArray.add(i) // all frames has medium size
      };
    });
    return tmpArray;
  }

  const [ frameIndex, setFrameIndex ] = useState(
    getFrameProps(props.frameSet, 'index')
  );
  // [ (0:'登記課表', 1:'備選清單'), 2:'課程搜尋', 3:'課程地圖']
  // Decide the Arrangement of Stack

  const [ frameDisplay, setFrameDisplay ] = useState(
    getFrameProps(props.frameSet, 'defaultDisplay')
  );
  // [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']
  // Decide the size of each frame

  const [ allowSmall, setAllowSmall ] = useState(
    checkFrameAllow(props.frameSet, 'small')
  );
  // const [ allowFull, setAllowFull ] = useState(
  //   checkFrameAllow(props.frameSet, 'fullscreen')
  // );

  // handle Enlarge and Shrink
  const moveShrinkToSmall = () => {
    // leftFrame used
    let { leftFrameIndex, rightFrameIndex } = frameIndex.slice(0,2);
    let frameDisplayClone = frameDisplay.slice();

    frameDisplayClone[leftFrameIndex] = 0;
    frameDisplayClone[rightFrameIndex] = 1;

    setFrameIndex([rightFrameIndex, leftFrameIndex, ...frameIndex.slice(2) ]);
    setFrameDisplay(frameDisplayClone);
    // index interchange between 2 current frame
  };
  
  const moveShrinkToMedium = () => {
    // leftFrame used
    let { leftFrameIndex, rightFrameIndex } = frameIndex.slice(0,2);
    let frameDisplayClone = frameDisplay.slice();

    frameDisplayClone[leftFrameIndex] = 1;
    frameDisplayClone[rightFrameIndex] = 0;

    setFrameDisplay(frameDisplayClone);
    // no index interchange
  };

  const moveEnlargeToMedium = () => {
    // rightFrame used
    let { leftFrameIndex, rightFrameIndex } = frameIndex.slice(0,2);
    let frameDisplayClone = frameDisplay.slice();

    let newSmallAllow = (allowSmall.filter(i => i!==rightFrameIndex))[
      Math.floor(Math.random()*(allowSmall.length-1))
    ];

    frameDisplayClone[leftFrameIndex] = -1;
    frameDisplayClone[rightFrameIndex] = 1;
    frameDisplayClone[newSmallAllow] = 0;

    // [(0 ,1), 2, 3] -> [(1), 2, 3, 0] -> [(1, 3), 2, 0]
    setFrameIndex([
      frameIndex[1], newSmallAllow, ...frameIndex.filter(
        i => (i!==newSmallAllow)&&(i!==frameIndex[1])
      ) 
    ]);
    setFrameDisplay(frameDisplayClone);
    // original leftFrame disappear
    // right to left
    // summon newSmallAllow as new right 
  };

  const moveEnlargeToFullScreen = () => {
    // leftFrame used
    let { leftFrameIndex, rightFrameIndex } = frameIndex.slice(0,2);
    let frameDisplayClone = frameDisplay.slice();

    frameDisplayClone[leftFrameIndex] = 2;
    frameDisplayClone[rightFrameIndex] = -1;

    setFrameDisplay(frameDisplayClone);
    // right disapear
    // left to fullscreen
    // no index interchange
  };


  const frameRender = frameIndex.map((index, i) => {
    let frameData = (props.frameSet)[index];
    return (
      <Frame
        moveEnlarge={() => console.log('Enlarge')}
        moveShrink={() => console.log('Shrink')}

        frameTitleLabel={frameData.index}
        frameSize={frameDisplay[index]}
        allowMax={frameData.allowMax}
        allowMin={frameData.allowMin}

        buttonCustom={frameData.buttonCustom}
        searchInputShow={frameData.searchInputShow}
        buttonCustomShow={frameData.buttonCustomShow}
        spacingLv={2}
      >
        {frameData.children}
      </Frame>
    );
  });
  // const [ frameRender, setFrameRender ] = useState(demoFrames.map((values, i) => {
  //   return (
  //     <Frame
  //       frameTitleLabel={`測試框架-${value}`}
  //       moveEnlarge={() => console.log('Enlarge')}
  //       moveShrink={() => console.log('Shrink')}
  //       frameSize={1-i}
  //       allowMax={2}
  //       allowMin={0}
  //       spacingLv={2}
  //     >
  //       test
  //     </Frame>
  //   )
  // }));



  // 必須在這邊就知道每個Frame的allowMax和allowMin

  // const frameRender = frameIndex => {

  // };


  const handleWidthChange = () => {

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
  // calledFrameIndex: PropTypes.number,
};
MainContent.defaultProps = {
  frameSet: demoFrameSet
}

export default MainContent;