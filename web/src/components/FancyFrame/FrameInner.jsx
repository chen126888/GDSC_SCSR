// Material Components
import Box from '@mui/material/Box';
// Main Components
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function

const useStyles = makeStyles(theme => {

  return createStyles({
    main: {
      overflowY: "scroll",
      /** scrollbar hidden */
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      padding: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      display: 'flex',
    },
    inner: {
      padding: theme.spacing(2),
      flexGrow: 1,
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows.frameInner,
    }

  })
});

function FrameInner(props) {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.main} >
      <Box className={classes.inner} >
        {props.children}
      </Box>
    </Box>
  )
}

export default FrameInner