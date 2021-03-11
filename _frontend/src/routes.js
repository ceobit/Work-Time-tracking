import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {AuthPage} from './pages/AuthPage';
import {RegisterPage} from './pages/RegisterPage';
import {MainPage} from './pages/MainPage';



export const useRoutes = (isAuth) => {
  console.log('isAuth',isAuth);
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
      <Route path="/" exact component={AuthPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/register" component={RegisterPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
