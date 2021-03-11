import React from 'react';
import {useSelector} from 'react-redux';
import {
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { useStyles } from './style';
import {history} from '../../aux';


export const Bar = () => {

  const classes = useStyles();

  const user = useSelector(state => state.authentication.user.user);

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
          <Link onClick={() => history.push('/')} ><Button className={classes.user}>{user.username}</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}