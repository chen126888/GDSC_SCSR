// Material Components

// Main Components
import CourseTabs from '../CourseSelecter/CourseSelection';
import RouteTabs from '../CourseRouteMap/CourseRoute';
import { DummybuttonCustom, DummyFrameChild } from './DummyComponent';
// Styles

// Hooks and Function

/**
 * - Size Change Rule 
 * 1. Click Header buttons, if can shrink, then shrink, otherwise be repalced.
 * 2. Click enlarge button in small frame,
 *  left one enlarging to replace right one and call anther one small frame at oringnal palce.
 * 
 * - Size
 * 2: large: 備選清單、課程搜尋
 * 1: medium: 備選清單、課程搜尋、課程地圖、登記課表
 * 0: small: 備選清單、課程地圖
 * 
 *  - Index of Each Frame
 * [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖' ] 
 * 
 */


// Pass chilren data
var demoFrameData = [
  {
    label: '登記課表',
    defaultDisplay: 1,
    allowMax: 1,
    allowMin: 1,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: false,
    children: <CourseTabs key={1} />,
  }, {
    label: '備選清單',
    defaultDisplay: 0,
    allowMax: 2,
    allowMin: 0,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <DummyFrameChild key={1} />,
  }, {
    label: '課程搜尋',
    defaultDisplay: -1,
    allowMax: 2,
    allowMin: 1,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <DummyFrameChild key={1} />,
  }, {
    label: '課程地圖',
    defaultDisplay: -1,
    allowMax: 1,
    allowMin: 0,
    panelCustomShow: true,
    buttonCustomShow: true,
    searchInputShow: true,
    children: <RouteTabs key={1} />,
  },
];

export { DummyFrameChild, DummybuttonCustom, demoFrameData };
