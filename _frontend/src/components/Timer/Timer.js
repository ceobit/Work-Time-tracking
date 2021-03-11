import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import {useStyles} from './style';
import Input from '../Input/Input';
import Clock from '../Clock/Clock';
import {Tools} from '../Tools/Tools';


export default function Timer() {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid sm={7}>
            <Input label={'What are you working on?'} name='task' inputValue={inputValue} setInputValue={setInputValue}/>
          </Grid>
          <Grid sm={5} className={classes.clock}>
            <Clock setInputValue={setInputValue}/>
          </Grid>
          <Tools/>
        </Grid>
      </CardContent>
    </Card>
  );
}