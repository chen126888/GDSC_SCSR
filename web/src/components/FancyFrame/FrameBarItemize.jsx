// Material Components
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
// Main Components

// Styles
import { makeStyles, createStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { EnlargeIcon, ShrinkIcon, FullScreenIcon } from './../../image/FrameBarIcon';
// Hooks and Function

const useStyles = makeStyles(theme => {
  
  return createStyles({
    search: {
      margin: theme.spacing(1, 1, 1, 1),
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      display: 'flex',
      flexDirection: 'row'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
    },
    inputRoot: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      flexGrow: 1,
    },
    inputInput: {
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      },
    },
  });
});

function SearchBox(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

function ButtonEnlarge({ frameSize, onClick }) {

  return (
    <Button onClick={onClick} color='antiPrimary' >
      {(frameSize === 1) ? (
        <FullScreenIcon fontSize='large' />
      ) : (
        <EnlargeIcon fontSize='large' />
      )}
    </Button>
  )
}

function ButtonShrink({ frameSize, onClick }) {

  return (
    <Button onClick={onClick} color='antiPrimary' >
      {(frameSize === 1) ? (
        <ShrinkIcon fontSize='large' />
      ) : (
        <EnlargeIcon fontSize='large' />
      )}
    </Button>
  )
}

export { SearchBox, ButtonEnlarge, ButtonShrink };