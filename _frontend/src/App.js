import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Router } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import { history } from './aux';
import { useRoutes } from './routes';
import './App.css';
import { alertActions } from './redux/actions';

// eslint-disable-next-line import/prefer-default-export
export const App = () => {
  const routes = useRoutes();

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  const closeAlert = () => {
    dispatch(alertActions.clear());
  };

  return (
    <>
      {alert.message && (
        <Alert severity="error" onClose={closeAlert}>
          {alert.message}
        </Alert>
      )}
      <Router history={history}>{routes}</Router>
    </>
  );
};
