// Material Components
import Box from '@mui/material/Box';
// Main Components
import SheetRow from './SheetRow';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  dayRoot: props => ({
    position: "relative",
    height: `${props.itemHeight * (props.itemNum + 0.5)}vh`,
    // width: "20%",
    display: 'flex',
    flex: 0.4,
    flexDirection: 'column',
  }),

}));

function RowTitle({
  itemHeight, firstClassTime, lastClassTime,
}) {

  let itemNum = (lastClassTime - firstClassTime + 1);
  const classes = useStyles({
    itemHeight: itemHeight,
    itemNum: itemNum,
  });

  return (
    <Box className={classes.dayRoot} >
      {Array.from({ length: itemNum }, (e, i) => (
        <SheetRow
          itemHeight={itemHeight}
          rowIndex={`${(i + firstClassTime)}`}
          variant={"title"}
          key={i}
        />
      ))}
    </Box >
  )
};
RowTitle.defaultProps = {
  itemHeight: 8,
  firstClassTime: 8,
  lastClassTime: 21,
};
RowTitle.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  firstClassTime: PropTypes.number.isRequired,
  lastClassTime: PropTypes.number.isRequired,
};

export default RowTitle;