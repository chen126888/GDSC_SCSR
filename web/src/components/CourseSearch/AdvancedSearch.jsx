// Material Components
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
// Main Components
import SearchBar from './SearchBar';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
// Hooks and Function
import { useState } from 'react';

const useStyles = makeStyles(theme => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

        width: '84%',
        margin: 'auto'
    },
    componentContainer: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        width: '100%',
        margin: 8
    },
    title: {
        marginLeft: 8,
        marginRight: 20,
        width: 68,
        textAlign: 'left'
    },
    openCourseInput: {
        width: '70%',
    },
    timeInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 40
    }

}));


const AdvancedSearch = () => {
    const classes = useStyles();

    const OpenCourseUnit = () => {
        return (
            <div className={classes.componentContainer}>
                <div className={classes.title}>開課單位</div>
                <div className={classes.openCourseInput}>
                    <FormControl fullWidth>
                        <Select id="course-unit"></Select>
                    </FormControl>
                </div>
            </div>
        )
    }

    const TimeInput = () => {
        return (
            <div className={classes.componentContainer}>
                <div className={classes.title}>時間</div>
                <div className={classes.timeInput}>
                    <FormControl fullWidth>
                        <Select id="time-1"></Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <Select id="time-2"></Select>
                    </FormControl>
                </div>
                <FormControl>
                    <RadioGroup row={true} aria-label="degree" name="degree-group" >
                        <FormControlLabel value="bachelor" control={<Radio />} label="學" />
                        <FormControlLabel value="master" control={<Radio />} label="碩" />
                        <FormControlLabel value="doctor" control={<Radio />} label="博" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    const DateInput = () => {
        return (
            <div className={classes.componentContainer}>
                <div className={classes.title}>星期</div>
                <FormControl>
                    <RadioGroup row={true} aria-label="date" name="date-group" >
                        <FormControlLabel value="mon" control={<Radio />} label="一" />
                        <FormControlLabel value="tue" control={<Radio />} label="二" />
                        <FormControlLabel value="wed" control={<Radio />} label="三" />
                        <FormControlLabel value="thu" control={<Radio />} label="四" />
                        <FormControlLabel value="fri" control={<Radio />} label="五" />
                        <FormControlLabel value="sat" control={<Radio />} label="六" />
                        <FormControlLabel value="sun" control={<Radio />} label="日" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    const LanguageInput = () => {
        return (
            <div className={classes.componentContainer}>
                <div className={classes.title}>授課語言</div>
                <FormControl>
                    <RadioGroup row={true} aria-label="lang" name="lang-group" >
                        <FormControlLabel value="chin" control={<Radio />} label="中文" />
                        <FormControlLabel value="eng" control={<Radio />} label="英文" />
                        <FormControlLabel value="other" control={<Radio />} label="其他外語" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    const RemainderInput = () => {
        return (
            <div className={classes.componentContainer}>
                <div className={classes.title}>選課餘額</div>
                <FormControl>
                    <RadioGroup row={true} aria-label="remainder" name="remainder-group" >
                        <FormControlLabel value="remainder" control={<Radio />} label="尚有餘額" />
                        <FormControlLabel value="noRemainder" control={<Radio />} label="暫為額滿（零餘額）" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    return (
        <div className={classes.container}>
          <SearchBar/>
          <OpenCourseUnit/>
          <TimeInput/>
          <DateInput/>
          <LanguageInput/>
          <RemainderInput/>
        </div>
    );
  };
  
  export default AdvancedSearch;