import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  CssBaseline,
  TextField,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import {useStyles} from './style';
import {usersActions} from '../../redux/actions';

export const RegisterPage = () => {

  const classes = useStyles();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const {username, password} = user;
  // const registering = useSelector(state => state.registrationReducer.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(usersActions.logout());
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(usersActions.register(user));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="User name"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {submitted && !username &&
              <Typography variant="subtitle2" component="h1" color="error">
                Username is required
              </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              {submitted && !password &&
              <Typography variant="subtitle2" component="h1" color="error">
                Password is required
              </Typography>
              }
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}