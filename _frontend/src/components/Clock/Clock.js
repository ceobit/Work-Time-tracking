import React, {useCallback, useEffect, useState} from 'react';
import {formatDate} from '../../aux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './style';

export default function App() {

  const classes = useStyles();

  const initialState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [activeTime, setActiveTime] = useState(initialState);

  const [startTimer, setStartTimer] = useState(false);

  const calculateTime = useCallback(() => {
    let {hours, minutes, seconds} = activeTime;
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    return {...activeTime, hours: hours, minutes: minutes, seconds: seconds};
  }, [activeTime]);

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        setActiveTime(calculateTime);
      }, 1000);
    }
  }, [activeTime, startTimer]);

  const handleTimer = () => {
    setStartTimer(!startTimer);
  };

  const handleSaveTime = () => {
    setActiveTime({...initialState});
  };

  return (
    <div className={classes.clock}>
      <Typography variant="h5" component="h2">
        {(`${formatDate(activeTime.hours)}:${formatDate(
          activeTime.minutes)}:${formatDate(activeTime.seconds)}`)}
      </Typography>
      <Button variant="contained"
              color={startTimer ? 'secondary' : 'primary'}
              onClick={handleTimer}>
        {startTimer ? 'Stop' : 'Start'}
      </Button>
      <Button variant="contained"
              color='default'
              disabled={startTimer}
              onClick={handleSaveTime}>
        Save
      </Button>
    </div>
  );
}