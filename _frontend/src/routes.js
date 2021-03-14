import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthPage } from './pages/AuthPage';
import { RegisterPage } from './pages/RegisterPage';
import { MainPage } from './pages/MainPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={AuthPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/register" component={RegisterPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
