// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Main Components
import Frame from '../FancyFrame/Frame';
import CourseTabs from './CourseSheetTab';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SearchIcon from '@mui/icons-material/Search';
// Hooks and Function
// import clsx from 'clsx';
import { useState } from 'react';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles( theme => createStyles({
  root: {
    top: '40vh',
    height: '60vh',
    width: '100%',
    position: 'absolute',
  },
  frameContainer: {
    // zIndex: 1001,
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  maintainPanel: {
    zIndex: 1021,
    position: 'absolute',
  },
  buttonCommon: {
    color: 'white !important',
    // color: theme.palette.primary.contrastText,
    height: '100%',
  },


}) );

function MainContent (props) {
  const classes = useStyles(props);


  return (
    <main className={classes.root}>
      <ButtonGroup className={classes.maintainPanel} >
        <Button
          // onClick={handleWidthChange}
        >
          ChangeWidth
        </Button>
      </ButtonGroup>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'background.paper',
        }}
        className={classes.frameContainer} 
      >
        {/* <Frame
          frameTitleLabel={"測試框架"}
          allowMax={1}
          allowMin={0}
          spacingLv={2}
        >
        </Frame>  */}
        <Frame
          frameTitleLabel={"測試框架"}
          allowMax={2}
          allowMin={0}
          spacingLv={2}
        >

        </Frame>
      </Box>

    </main>
  );
};
export default MainContent;