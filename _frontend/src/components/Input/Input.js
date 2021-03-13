import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './style';
import { alertActions, timerActions } from '../../redux/actions';

export default function Input({ label, name, inputValue, setInputValue }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer.message);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    dispatch(timerActions.createDescription(value));
    name === 'task' && alert ? dispatch(alertActions.clear()) : null;
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        className={classes.input123}
        name={name}
        value={inputValue}
        label={label}
        variant="outlined"
        size="small"
        autoFocus
        required
        onChange={handleChange}
      />
    </form>
  );
}
