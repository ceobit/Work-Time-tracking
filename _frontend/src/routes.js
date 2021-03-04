import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './components/AuthPage';
import {RegisterPage} from './components/RegisterPage';


export const useRoutes = (isAuth) => {
  // if (isAuth) {
  //   return (
  //     <Switch>
  //       <Route path="/main" exact>
  //         <MainPage />
  //       </Route>
  //       <Route path="/create" exact>
  //         <DocumentsContainer />
  //       </Route>
  //       <Route path="/register">
  //         <RegisterPage />
  //       </Route>
  //       <Route path="/printForm" exact>
  //         <PrintForm />
  //       </Route>
  //       <Route path="/printContract" exact>
  //         <PrintContract />
  //       </Route>
  //       <Route path="/printWorkStatement" exact>
  //         <PrintWorkStatement />
  //       </Route>
  //       <Redirect to="/main" />
  //     </Switch>
  //   );
  // }

  return (
    <Switch>
      <Route path="/" exact>
        {/*<AuthPage />*/}
        <RegisterPage/>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
