import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import {usersActions} from '../../redux/actions';
import {useStyles} from './style';

export const AuthPage = () => {

  const classes = useStyles();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const {username, password} = inputs;
  // const loggingIn = useSelector(state => state.authenticationReducer.loggingIn); //Нужен для спинера на кнопке
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(usersActions.logout());
  }, []);

  const handleChange = e => {
    const {name, value} = e.target;
    setInputs(inputs => ({...inputs, [name]: value}));
  }

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const {from} = location.state || {from: {pathname: '/'}};
      dispatch(usersActions.login(username, password, from));
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              autoFocus
              onChange={handleChange}
            />
            {submitted && !username &&
            <Typography variant="subtitle2" component="subtitle2" color="error">
              Username is required
            </Typography>
            }
            <TextField
              variant="outlined"
              margin="normal"
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
            <Typography variant="subtitle2" component="subtitle2" color="error">
              Password is required
            </Typography>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};