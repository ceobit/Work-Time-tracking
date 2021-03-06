import React from 'react';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './style';

export default function Input({label}) {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField name="task" label={label} size="small"/>
    </form>
  );
}