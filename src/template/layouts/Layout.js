import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import ProductProvider from '../components/e-commerce/ProductProvider';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';

const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));
const Workshops = loadable(() => import('../../views/pages/clients/workshops'));
const WizardLayout = loadable(() => import('../components/auth/wizard/WizardLayout'));
const LoginLayout = loadable(() => import('../../views/components/auth/Login'));
const LogoutLayout = loadable(() => import('../../views/components/auth/Logout'));
const AuthCardRoutes = loadable(() => import('../components/auth/card/AuthCardRoutes'));

const Layout = () => {
  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
    WizardLayout.preload();
    LoginLayout.preload();
    LogoutLayout.preload();
    AuthCardRoutes.preload();
    Workshops.preload();
  }, []);

  return (
    <ProductProvider>
      <Router fallback={<span />}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/talleres" exact component={Workshops} />
          <Route path="/authentication/basic" component={AuthBasicLayout} />
          <Route path="/authentication/card" component={AuthCardRoutes} />
          <Route path="/authentication/wizard" component={WizardLayout} />
          <Route path="/authentication/login" exact component={LoginLayout} />
          <Route path="/authentication/logout" exact component={LogoutLayout} />
          <Route path="/errors" component={ErrorLayout} />
          <Route component={DashboardLayout} />
        </Switch>
        <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
      </Router>
    </ProductProvider>
  );
};

export default Layout;
