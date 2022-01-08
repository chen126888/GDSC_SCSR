// Material Components
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
// Main Components
import SearchBar from './SearchBar';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function


const useStyles = makeStyles(theme => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

    width: '80%',
    margin: 'auto'
  },
//   searchContainer: {
//     backgroundColor: 'red',
//   },
//   searchIconContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 8
//   }
}));

const SimpleSearch = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <SearchBar/>
    </div>
  );
};

export default SimpleSearch;