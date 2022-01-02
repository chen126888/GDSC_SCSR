// Material Components
import Box from '@mui/material/Box';
// Main Components
import SheetRow from './SheetRow';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import PropTypes from 'prop-types';
import { dummyData } from './SheetColumnRender';

const useStyles = makeStyles(theme => createStyles({
  dayRoot: props => ({
    position: "relative",
    height: `${props.itemHeight * (props.itemNum + 0.5)}vh`,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: 0,
    zIndex: 1210,
    "&:hover": {
      zIndex: 1220,
    }
  }),

}));

function DayColumn({
  today, itemHeight, renderResult, firstClassTime, lastClassTime,
}) {

  let itemNum = (lastClassTime - firstClassTime + 1);
  const classes = useStyles({
    itemHeight: itemHeight,
    itemNum: (lastClassTime - firstClassTime + 1),
  });

  return (
    <Box
      className={classes.dayRoot}
      component={"td"}
    >
      {renderResult}
      {Array.from({ length: itemNum }, (e, i) => (
        <SheetRow
          itemHeight={itemHeight}
          rowIndex={""}
          key={i}
        />
      ))}
    </Box >
  )
};
DayColumn.defaultProps = {
  today: "weekend",
  itemHeight: 8,
  renderResult: dummyData,
  firstClassTime: 8,
  lastClassTime: 21,
};
DayColumn.propTypes = {
  today: PropTypes.string.isRequired,
  itemHeight: PropTypes.number.isRequired,
  renderResult: PropTypes.array.isRequired,
  firstClassTime: PropTypes.number.isRequired,
  lastClassTime: PropTypes.number.isRequired,
};

export default DayColumn;