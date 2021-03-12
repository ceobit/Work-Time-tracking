import React, { useState } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';

import { useStyles } from './style';
import Input from '../Input/Input';
import Clock from '../Clock/Clock';
import { Tools } from '../Tools/Tools';

export default function Timer() {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.default}>
        <Grid container spacing={0} className={classes.default}>
          <Grid container item xs={7} className={classes.default}>
            <Input
              label="What are you working on?"
              name="task"
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </Grid>
          <Grid container item xs={5} className={classes.clock}>
            <Clock setInputValue={setInputValue} />
          </Grid>
          <Tools />
        </Grid>
      </CardContent>
    </Card>
  );
}
