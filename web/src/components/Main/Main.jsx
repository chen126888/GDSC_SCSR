// Material Components
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components
import Frame from './Frame';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SearchIcon from '@mui/icons-material/Search';
// Hooks and Function
// import clsx from 'clsx';
import { useState } from 'react';

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
  const [ leftFrameExpand, setLeftFrameExpand ] = useState(false);
  const [ isLeftFrameHome, setLeftFrameHome ] = useState(false);
  const [ isRightFrameHome, setRightFrameHome ] = useState(false);

  const handleWidthChange = () => {
    setLeftFrameExpand( !leftFrameExpand );
    setLeftFrameHome( !isLeftFrameHome );
    setRightFrameHome( !isRightFrameHome );
  };

  const handleRightFrameBack = () => {
    setLeftFrameExpand( !leftFrameExpand );
    setRightFrameHome( !isRightFrameHome );
  };

  return (
    <main className={classes.root}>
      <ButtonGroup className={classes.maintainPanel} >
        <Button onClick={handleWidthChange}>
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
        {/* LeftFrame */}
        <Frame 
          expandControl={leftFrameExpand}
          isHomePage={isLeftFrameHome}
          normalWidth={'70%'}
          expandWidth={'0%'}
          spacingLv={2}
          justifyFrame={'left'}
          elevation={8}
          zIndex={1001}
          frameTitleLabel={"登記課表"}
          panelButtons={[ (
            <Button 
              className={classes.buttonCommon}
              // onClick={}
            >
              <CloseIcon size="large" />
            </Button>
          ),(
            <Button 
              className={classes.buttonCommon}
              // onClick={}
            >
              <SaveIcon size="large" />
            </Button>
          ),(
            <Button 
              className={classes.buttonCommon}
              // onClick={}
            >
              <EditIcon size="large" />
            </Button>
          ) ]}
          backButtonClick={false}
        >
          
          Left
        </Frame>
        {/* RightFrame */}
        <Frame
          expandControl={leftFrameExpand}
          isHomePage={isRightFrameHome}
          normalWidth={'30%'}
          expandWidth={'100%'}
          spacingLv={2}
          justifyFrame={'right'}
          elevation={8}
          zIndex={1011}
          frameTitleLabel={ isLeftFrameHome ? "備選清單" : "課程查詢"}
          panelButtons={[ (
            <Button 
              className={classes.buttonCommon}
              // onClick={handleRightFrameFull}
            >
              <OpenInFullIcon size="large" />
            </Button>
          ),(
            <Button 
              className={classes.buttonCommon}
              // onClick={}
            >
              <CloseIcon size="large" />
            </Button>
          ),(
            <Button 
              className={classes.buttonCommon}
              // onClick={}
            >
              <SearchIcon size="large" />
            </Button>
          ) ]}
          backButtonClick={handleRightFrameBack}
        >
          Right
        </Frame>     
      </Box>

    </main>
  );
};
export default MainContent;