import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import {history} from './aux';
import {useRoutes} from './routes';
import './App.css';
import {alertActions} from './redux/actions';

export default () => {
  const routes = useRoutes(false); // не забыть убрать false

  const alert = useSelector(state => state.alertReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <BrowserRouter>
      {alert.message &&
      <Alert severity="error">{alert.message}</Alert>
      }
      {routes}
    </BrowserRouter>
  );
}
