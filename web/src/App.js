// Material Components

// Main Components
import MainContent from './components/Main/Main';
import HeadContent from './components/Header/dummyHeader';
import { demoFrameData } from './components/Main/dummyChildren';

// Styles
// import { makeStyles } from '@material-ui/core/styles';
// import { createStyles } from '@mui/styles';
// import MinimizeIcon from '@mui/icons-material/Minimize';
// import logo from './logo.svg';
import './App.css';

// Hooks and Function
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { useState } from 'react';

function App() {
  const [ selectedFrame, setSelectedFrame ] = useState(0);

  const handleCourseEnrollment = () => {
    setSelectedFrame(0);
    console.log('登記課表');
  };
  const handleCourseSearch = () => {
    setSelectedFrame(2);
    console.log('課程搜尋');
  };
  const handleCourseRouteMap = () => {
    setSelectedFrame(3);
    console.log('課程地圖');
  };
  const handleCourseTracking = () => {
    setSelectedFrame(1);
    console.log('備選清單');
  }
  // [ 0:'登記課表', 1:'備選清單', 2:'課程搜尋', 3:'課程地圖']

  return (
    <div className="App">
      <HeadContent
        callCourseEnrollment={handleCourseEnrollment}
        callCourseSearch={handleCourseSearch}
        callCourseRouteMap={handleCourseRouteMap}
        callCourseTracking={handleCourseTracking}
      ></HeadContent>
      <MainContent
        selectedFrame={selectedFrame}
        frameData={demoFrameData}
      ></MainContent>
    </div>
  );
}

export default App;
