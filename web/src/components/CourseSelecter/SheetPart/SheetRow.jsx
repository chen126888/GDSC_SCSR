// Material Components
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Main Components

// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  root: props => ({
    position: "relative",
    height: `${props.itemHeight}vh`,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: (clsx(props.flexGrow) ? props.flexGrow : 1),
  }),
  title: props => ({
    color: theme.palette.text.hint,
    hright: '150%',
  }),
}));

function SheetRow({
  itemHeight, rowIndex, variant, flexGrow, component
}) {
  const classes = useStyles({
    itemHeight: itemHeight,
    variant: variant,
    flexGrow: flexGrow
  })

  return (
    <Paper
      className={classes.root}
      square={true}
      component={component}
      {...(
        variant === "title" ? { 
          elevation: 0 
        } : { 
          variant: "outlined",
        }
      )}
    >
      <Typography
        className={classes.title}
        variant={"h5"}
        component={"h5"}
        align={"center"}
      >
        {rowIndex}
      </Typography>
    </Paper>
  );
};
SheetRow.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  rowIndex: PropTypes.string.isRequired,
};

export default SheetRow;