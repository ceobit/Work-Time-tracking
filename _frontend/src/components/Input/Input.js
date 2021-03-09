import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';

import { useStyles } from './style';

import {timerActions} from '../../redux/actions';

export default function Input({label}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleChange = e => {
    const { value } = e.target;
    dispatch(timerActions.createDescription(value));
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        name="task"
        label={label}
        variant='outlined'
        size='small'
        onChange={handleChange}
      />
    </form>
  );
}