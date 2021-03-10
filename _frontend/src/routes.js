import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {AuthPage} from './pages/AuthPage';
import {RegisterPage} from './pages/RegisterPage';
import {MainPage} from './pages/MainPage';
import {EditRecord} from './components/EditRecord/EditRecord';


export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
        <Switch>
          <Route path="/main" component={MainPage} />
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/">
            <AuthPage/>
          </Route>
        </Switch>
    );
  }
  return (
    <Switch>
      {/*<Route path="/" exact component={AuthPage} />*/}
      <Route path="/" component={MainPage} />
      {/*<Route path="/" component={EditRecord} />*/}
      <Route path="/register" component={RegisterPage} />
      {/*<Redirect to="/" />*/}
    </Switch>
  );
};
