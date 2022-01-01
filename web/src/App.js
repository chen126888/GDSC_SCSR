// Material Components
import { ThemeProvider } from '@mui/material/styles';
// Main Components
import HomePage from './pages/Home';
// Styles
import './App.css';
import { courseSelectThemeLightOne } from './theme/courseSelectTheme';
// Hooks and Function

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={courseSelectThemeLightOne}>
        <HomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;
