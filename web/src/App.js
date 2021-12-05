// Material Components

// Main Components
import MainContent from './components/Main/Main';
import HeadContent from './components/Header/dummyHeader';
import { demoFrameData } from './components/Main/dummyChildren';

// Styles
import './App.css';

// Hooks and Function
import { useState } from 'react';
import { getFrameProps, checkFrameAllow } from './components/Main/FrameRenders';

function App() {
  let frameRenderBase = {
    data: demoFrameData,
    allowSmall: checkFrameAllow(demoFrameData, 'small'),
  };

  const [ frameRenderRule, setFrameRenderRule ] = useState({
    frameIndex: getFrameProps(frameRenderBase.data, 'index'),
    frameDisplay: getFrameProps(frameRenderBase.data, 'defaultDisplay'),
    currentSelected: 0,
    lastSelected: 1,
    isSelectedEvent: false,
  });

  const setSelectedFrame = selectedNumber => setFrameRenderRule({
    frameIndex: frameRenderRule.frameIndex,
    frameDisplay: frameRenderRule.frameDisplay,
    currentSelected: selectedNumber,
    lastSelected: frameRenderRule.lastSelected,
    isSelectedEvent: true,
  });

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
        frameRenderBaseObject={frameRenderBase}
        frameRenderRuleState={frameRenderRule}
        setFrameRenderRuleHook={setFrameRenderRule}
      ></MainContent>
    </div>
  );
}

export default App;
