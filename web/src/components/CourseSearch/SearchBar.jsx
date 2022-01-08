// Material Components
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function


const useStyles = makeStyles(theme => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 8
    // margin: 'auto'
  },
  searchIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <TextField fullWidth id="outlined-search" label="輸入關鍵字、老師姓名或課號" type="search" />
        <div className={classes.searchIconContainer}>
          <SearchIcon color="primary" />
        </div>
    </div>
  );
};

export default SearchBar;