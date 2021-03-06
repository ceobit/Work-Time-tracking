import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './style';
import Input from '../Input/Input';

export default function Timer() {
  const classes = useStyles();


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Input label={"What are you working on?"}/>
      </CardContent>
      {/*<CardActions>*/}
      {/*  <Button size="small">Learn More</Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
}