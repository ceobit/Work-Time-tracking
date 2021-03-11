import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from '../Clock/style';

export const DatePicker = ({ id, label, onChange }) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
      />
    </form>
  );
};
