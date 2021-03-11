import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Router } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import { history } from './aux';
import { useRoutes } from './routes';
import './App.css';
import { alertActions } from './redux/actions';

export const App = () => {
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const routes = useRoutes(loggingIn);

  const alert = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <>
      {alert.message && <Alert severity="error">{alert.message}</Alert>}
      <Router history={history}>{routes}</Router>
    </>
  );
};
