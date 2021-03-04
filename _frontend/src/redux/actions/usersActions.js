import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../types';
import { history } from '../../aux';
import { alertActions} from './alertActions';
import { http } from '../../auth';

const login = (username, password, from) =>{

  const request = user => ({ type: LOGIN_REQUEST, user });
  const success = user => ({ type: LOGIN_SUCCESS, user });
  const fail = error => ({ type: LOGIN_FAILURE, error });

  return dispatch => {
    dispatch(request({ username }));

    http.login(username, password)
    .then(
      user => {
        dispatch(success(user));
        history.push(from);
      },
      error => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

const logout = () => {
  http.logout();
  return { type: LOGOUT };
}


const register = user => {

  const request = user => ({ type: REGISTER_REQUEST, user });
  const success = user => ({ type: REGISTER_SUCCESS, user });
  const fail = error => ({ type: REGISTER_FAILURE, error });

  return dispatch => {
    dispatch(request(user));

    http.register(user)
    .then(
      user => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

export const usersActions = {
  login,
  register,
  logout
}