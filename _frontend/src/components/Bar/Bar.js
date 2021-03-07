import React from 'react'
import {Toolbar, IconButton, AppBar, Typography, Button} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { useStyles } from './style';

export const Bar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccessTimeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Work Time tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}