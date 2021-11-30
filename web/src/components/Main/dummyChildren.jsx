// Material Components
// import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
// import Frame from '../FancyFrame/Frame';
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
// import PropTypes from 'prop-types';
// import { useState, useCallback, useEffect } from 'react';

// 1. Click Header buttons, if can shrink, then shrink, otherwise be repalced.
// 2. Click enlarge button in small frame, 
//    left one enlarging to replace right one and call anther one small frame at oringnal palce.

// 2: large: 備選清單、課程搜尋
// 1: medium: 備選清單、課程搜尋、課程地圖、登記課表
// 0: small: 備選清單、課程地圖

// [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']

const useStyles = makeStyles(theme => createStyles({
  // When use Typescript: theme: Theme which imports from '@material-ui/styles'
  Button: props => ({
    borderTopLeftRadius: theme.spacing(props.spacingLv),
    color: 'white !important',
    height: '100%',
  }),

}));

const DummyFrameChild = props => {
  // const classes = useStyles(props);
  // console.log(props);
  return (
    <div key={props.keyForChild}>
      It's dummy child
      <Box>
        AAAAAAAAAAAAAAAAAA 
        size: {props.frameSize}
        key = {props.keyForChild}
      </Box>
    </div>
  )
};
const DummybuttonCustom = props => {
  const classes = useStyles(props);
  return (
    <Button className={classes.Button} >
      <MinimizeIcon fontSize='large' ></MinimizeIcon>
    </Button>
  )
};

var demoFrameData = [
  {
    label: '登記課表',
    defaultDisplay: 1,
    allowMax: 1,
    allowMin: 1,
    children: [(
      <DummyFrameChild key={1}/>
    ), (
      <DummyFrameChild key={2} />
    )],
    panelCustom: "dala, customPanel",
    panelCustomShow: true,
    buttonCustom: [(<DummybuttonCustom />), (<DummybuttonCustom />)],
    buttonCustomShow: true,
    searchInputShow: false,
  }, {
    label: '備選清單',
    defaultDisplay: 0,
    allowMax: 2,
    allowMin: 0,
    children: [(
      <DummyFrameChild key={1}/>
    ), (
      <DummyFrameChild key={2} />
    )],
    panelCustom: "dala, customPanel",
    panelCustomShow: true,
    buttonCustom: [(<DummybuttonCustom />), (<DummybuttonCustom />)],
    buttonCustomShow: true,
    searchInputShow: true,
  }, {
    label: '課程搜尋',
    defaultDisplay: -1,
    allowMax: 2,
    allowMin: 1,
    children: [(
      <DummyFrameChild key={1}/>
    ), (
      <DummyFrameChild key={2} />
    )],
    panelCustom: "dala, customPanel",
    panelCustomShow: true,
    buttonCustom: [(<DummybuttonCustom />), (<DummybuttonCustom />)],
    buttonCustomShow: true,
    searchInputShow: true,
  }, {
    label: '課程地圖',
    defaultDisplay: -1,
    allowMax: 1,
    allowMin: 0,
    children: [(
      <DummyFrameChild key={1}/>
    ), (
      <DummyFrameChild key={2} />
    )],
    panelCustom: "dala, customPanel",
    panelCustomShow: true,
    buttonCustom: [(<DummybuttonCustom />), (<DummybuttonCustom />)],
    buttonCustomShow: true,
    searchInputShow: false,
  },
];

export { DummyFrameChild, DummybuttonCustom, demoFrameData };
