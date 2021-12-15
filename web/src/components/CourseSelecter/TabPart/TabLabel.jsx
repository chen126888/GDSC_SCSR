// Material Components
import Box from '@mui/material/Box';
// Main Components

// Styles

// Hooks and Function
import PropTypes from 'prop-types';

// TabPanel for content
const TabLabel = props => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (<Box p={3}> {children} </Box>)}
    </div>
  );
};
TabLabel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabLabel;