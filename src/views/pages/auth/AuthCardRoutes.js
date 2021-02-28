import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';

const AuthCardRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/login`} exact component={Login} />
    <Route path={`${url}/logout`} exact component={Logout} />
    <Route path={`${url}/register`} exact component={Registration} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default AuthCardRoutes;
