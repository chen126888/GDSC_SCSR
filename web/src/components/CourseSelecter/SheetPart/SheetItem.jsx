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
// Hooks and Function
import { useState } from 'react';
import PropTypes from 'prop-types';

const useStylesForCourseItem = makeStyles(theme => createStyles({
  root: (itemConfig) => ({
    position: "absolute",
    top: `calc(${itemConfig.top * itemConfig.itemHeight}vh + ${itemConfig.top * 2.5}px)`,
    left: `${itemConfig.left * itemConfig.width}%`,
    width: `${(itemConfig.isFullWidth ? 100 : itemConfig.width)}%`,
    height: `calc(${itemConfig.height * itemConfig.itemHeight}vh + ${itemConfig.height * 2}px)`,
    flexGrow: 1,
    color: "white !important",
    backgroundColor: "black !important",
    borderRadius: theme.spacing(2),
    // border: "3px solid red",
    zIndex: 2000,
    "&:hover": {
      zIndex: 2200,
    }
  })
}));

function CourseItem({
  courseTitle, courseState, itemConfig, courseInfo, courseTime
}) {
  const classes = useStylesForCourseItem(itemConfig);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper 
      className={classes.root}
    >
      {/* <Button
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
              {String(courseTime)}
            </Grid>
            <Grid xs={4}>
            </Grid>
          </Grid>
        </Paper>
      </Button> */}
      <p>{String(courseTitle)}</p>
      <p>
        {String(courseTime)}{"/"}
        {String(itemConfig.top)}{"/"}
        {String(itemConfig.isFullWidth)}
      </p>
      <p>{String(courseState)}</p>
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
CourseItem.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  courseState: PropTypes.string.isRequired,
  itemConfig: PropTypes.object.isRequired,
  courseInfo: PropTypes.object.isRequired,
  courseTime: PropTypes.array.isRequired,
};

export default CourseItem;