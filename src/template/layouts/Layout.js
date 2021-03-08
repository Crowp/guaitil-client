import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import Loader from '../components/common/Loader';

import DashboardLayout from './DashboardLayout';
import LandingLayout from './LandingLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';
import { RouteMap } from '../../constants';

const LoginLayout = loadable(() => import('../../views/pages/auth/Login'), { fallback: <Loader /> });
const LogoutLayout = loadable(() => import('../../views/pages/auth/Logout'), { fallback: <Loader /> });

const Layout = () => {
  return (
    <Router fallback={<span />}>
      <Switch>
        <Route path={RouteMap.Auth.login()} exact component={LoginLayout} />
        <Route path={RouteMap.Auth.logout()} exact component={LogoutLayout} />
        <Route path="/errors" component={ErrorLayout} />
        <Route path={RouteMap.Home.root()} component={LandingLayout} />
        <Route component={DashboardLayout} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Router>
  );
};

export default Layout;
