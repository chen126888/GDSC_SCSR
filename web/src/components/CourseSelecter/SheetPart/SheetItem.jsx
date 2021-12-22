// Material Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Main Components

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';

// Hooks and Function
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

const useStylesForCourseItem = makeStyles(theme => createStyles({
  root: coursePosition => ({
    position: "relative",
    // display: 'flex',
    top: coursePosition.top,
    left: coursePosition.left,
    width: coursePosition.width,
    height: coursePosition.height,
  })
}));

function CourseItem({
  courseTitle, courseState, coursePosition, courseInfo
}) {
  const classes = useStylesForCourseItem(coursePosition);
  console.log(coursePosition)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper className={classes.root}>
      <Button
        onClick={handleOpen}
        className={classes.itemButton}
      >
        <Paper>
          <Grid container>
            <Grid xs={12}>
              <Typography>
                bala
                {courseTitle}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography>
                bala
              </Typography>
              {String(courseInfo)}
            </Grid>
            <Grid xs={4}>
              icon components
              {courseState}
            </Grid>
          </Grid>
        </Paper>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card variant="outlined" className={classes.itemModal}>

          <CardHeader title={
            "wwww"
          } />

          <CardContent className={classes.cardContent}>
            courseInfo
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button size="small">Learn More</Button>
          </CardActions>

        </Card>
      </Modal>
    </Paper>
  );
};

export default CourseItem;