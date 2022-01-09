// Material Components
import Box from '@mui/material/Box';
// Main Components
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { childPropsGiver } from './FrameFunctions';

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
      padding: theme.spacing(0, 1.5, 0.5, 1.5),
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      display: 'flex',
    },
    inner: {
      padding: theme.spacing(1, 1, 0.5, 1),
      flexGrow: 1,
      borderRadius: theme.spacing(2),
      borderTopLeftRadius: theme.spacing(2),
      borderTopRightRadius: theme.spacing(2),
      boxShadow: theme.shadows.frameInner,
    }

  })
});

const FrameInner = props => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.main} >
      <Box className={classes.inner} >
        {props.children}
      </Box>
    </Box>
  )
}

const FrameBarSummary = (
  { buttonCustom, panelCustom, barTaker }
) => {

  const tabBarWithProps = childPropsGiver(barTaker, {
    buttonCustom: buttonCustom,
    panelCustom: panelCustom,
  })

  return (
    <>
      {tabBarWithProps}
    </>
  )
}

export { FrameInner, FrameBarSummary }