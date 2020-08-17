import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import { useSelector, useDispatch } from 'react-redux';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';

import { selectAuthenticated } from '../../selectors/auth/AuthSelector';
import withRedirect from '../hoc/withRedirect';
import UserAction from '../../stores/user/UserAction';

const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));
const WizardLayout = loadable(() => import('../components/auth/wizard/WizardLayout'));
const LoginLayout = loadable(() => import('../../views/auth/Login.js'));
const AuthCardRoutes = loadable(() => import('../components/auth/card/AuthCardRoutes'));

const Layout = ({ setRedirect, setRedirectUrl }) => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
    WizardLayout.preload();
    LoginLayout.preload();
    AuthCardRoutes.preload();
  }, []);

  useEffect(() => {
    UserAction.verifyLogin(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl('/authentication/login');
    }
    setRedirect(true);
  }, [isAuthenticated]);

  return (
    <Router fallback={<span />}>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route path="/authentication/basic" component={AuthBasicLayout} />
        <Route path="/authentication/card" component={AuthCardRoutes} />
        <Route path="/authentication/wizard" component={WizardLayout} />
        <Route path="/authentication/login" component={LoginLayout} />
        <Route path="/errors" component={ErrorLayout} />
        <Route component={DashboardLayout} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Router>
  );
};

export default withRedirect(Layout);
