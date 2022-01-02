// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
import Frame from '../FancyFrame/Frame';
// import CourseTabs from '../CourseSelecter/CourseSheetTab';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
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

var demoFrameChildren = [
  {
    label: '登記課表',
    defaultFrame: 1,
    allowMax: 1,
    allowMin: 1,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ]
  },{
    label: '備選清單',
    defaultFrame: 0,
    allowMax: 2,
    allowMin: 0,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ]
  },{
    label: '課程搜尋',
    defaultFrame: -1,
    allowMax: 2,
    allowMin: 1,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ]
  },{
    label: '課程地圖',
    defaultFrame: -1,
    allowMax: 2,
    allowMin: 0,
    children: (
      <DummyFrameChild />
    ),
    customButton: [ (<DummyCustomButton />), (<DummyCustomButton />) ]
  },
];
// ['登記課表', '備選清單', '課程搜尋', '課程地圖']

function MainContent (props) {
  const classes = useStyles(props);

  const [ showedFrameIndex, setShowedFreameIndex ] = useState([1,2]);
  const [ frameRender, setFrameRender ] = useState(showedFrameIndex.map((value, i) => {
    return (
      <Frame
      frameTitleLabel={`測試框架-${value}`}
      moveEnlarge={() => console.log('Enlarge')}
      moveShrink={() => console.log('Shrink')}
      frameSize={1-i}
      allowMax={2}
      allowMin={0}
      spacingLv={2}
    >
      test
    </Frame>
    )
  }))
  // const handleShrinkToSmall
  // const handleShrinkToMedium
  // const handleEnlargeToMedium
  // const handleEnlargeToFullScreen

  // 必須在這邊就知道每個Frame的allowMax和allowMin

  // const frameRender = frameIndex => {

  // };

  const DummyChangePlace = [
    (
      <Frame
      frameTitleLabel={`測試框架1-${showedFrameIndex[0]}`}
      moveEnlarge={() => console.log('Enlarge')}
      moveShrink={() => console.log('Shrink')}
      frameSize={showedFrameIndex[0]}
      allowMax={2}
      allowMin={0}
      spacingLv={2}
    >
      test1
      {/* {showedFrameIndex} */}
    </Frame>
    ),(
      <Frame
      frameTitleLabel={`測試框架2-${showedFrameIndex[1]}`}
      moveEnlarge={() => console.log('Enlarge')}
      moveShrink={() => console.log('Shrink')}
      frameSize={showedFrameIndex[1]}
      allowMax={2}
      allowMin={0}
      spacingLv={2}
    >
      test2
    </Frame>
    )
  ]
  const DummyFrameFive = [1,0,-1,-1,-1].map((show, i) => {
    return (
      <Frame
      frameTitleLabel={`測試框架${i}`}
      moveEnlarge={() => console.log('Enlarge')}
      moveShrink={() => console.log('Shrink')}
      frameSize={showedFrameIndex[i]}
      allowMax={2}
      allowMin={0}
      spacingLv={2}
    >
      test
    </Frame>
    );
  })

  const handleWidthChange = () => {
    setShowedFreameIndex([
      showedFrameIndex[1],
      // showedFrameIndex[2],
      // showedFrameIndex[3],
      // showedFrameIndex[4],
      showedFrameIndex[0],
    ]);
    // setFrameRender([
    //   frameRender[1],  frameRender[0]
    // ])
    setFrameRender(showedFrameIndex.map((value, i) => {
      return (
        <Frame
        frameTitleLabel={`測試框架-${value}`}
        moveEnlarge={() => console.log('Enlarge')}
        moveShrink={() => console.log('Shrink')}
        frameSize={1-i}
        allowMax={2}
        allowMin={0}
        spacingLv={2}
      >
        test2
      </Frame>
      )
    }))
    console.log(showedFrameIndex);
  };

  return (
    <main className={classes.root}>
      {showedFrameIndex}
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
Frame.propTypes = {
  calledFrameIndex: PropTypes.number,
};

export default MainContent;