// Material Components

// Main Components
import MainContent from './components/Main/Main';
import HeadContent from './components/Header/dummyHeader';

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

  const handleCourseEnrollment = () => setSelectedFrame(0);
  const handleCourseSearch = () => setSelectedFrame(1);
  const handleCourseRouteMap = () => setSelectedFrame(2);
  const handleCourseTracking = () => setSelectedFrame(3);

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
      ></MainContent>
    </div>
  );
}

export default App;
