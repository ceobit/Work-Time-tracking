import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {formatDate} from '../../aux';
import {useStyles} from './style';
import {recordActions, timerActions} from '../../redux/actions';

export default function App() {

  const classes = useStyles();

  const initialState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [activeTime, setActiveTime] = useState(initialState);
  const [startTimer, setStartTimer] = useState(false);
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.timer.timeStart);
  const store = useStore();

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
    !startTimer && isActive === ''
      ? dispatch(timerActions.createTimeStart(new Date()))
      : dispatch(timerActions.createTimeFinish(new Date()));
  };

  const handleSaveTime = () => {
    setActiveTime({...initialState});
    dispatch(timerActions.createDuration(formatDate(activeTime)));
    //promise chain
    dispatch(recordActions.createRecord(store.getState().timer)).
      then(() => dispatch(recordActions.getRecords()));
  };

  return (
    <div className={classes.clock}>
      <Typography variant="h5" component="h2">
        {(`${formatDate(activeTime)}`)}
      </Typography>
      <Button variant="contained"
              color={startTimer ? 'secondary' : 'primary'}
              onClick={handleTimer}>
        {startTimer ? 'Stop' : 'Start'}
      </Button>
      <Button variant="contained"
              color='default'
              disabled={startTimer || activeTime.seconds === 0}
              onClick={handleSaveTime}>
        Save
      </Button>
    </div>
  );
}