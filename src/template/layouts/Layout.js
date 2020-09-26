import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import ProductProvider from '../components/e-commerce/ProductProvider';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';

const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'), { fallback: <Loader /> });
const Landing = loadable(() => import('../components/landing/Landing'), { fallback: <Loader /> });
const Workshops = loadable(() => import('../../views/pages/clients/workshops'), { fallback: <Loader /> });
const Kitchens = loadable(() => import('../../views/pages/clients/kitchens'), { fallback: <Loader /> });
const Lodgins = loadable(() => import('../../views/pages/clients/lodgin'), { fallback: <Loader /> });
const WizardLayout = loadable(() => import('../components/auth/wizard/WizardLayout'), { fallback: <Loader /> });
const LoginLayout = loadable(() => import('../../views/components/auth/Login'), { fallback: <Loader /> });
const LogoutLayout = loadable(() => import('../../views/components/auth/Logout'), { fallback: <Loader /> });
const AuthCardRoutes = loadable(() => import('../components/auth/card/AuthCardRoutes'), { fallback: <Loader /> });

const Layout = () => {
  return (
    <ProductProvider>
      <Router fallback={<span />}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/talleres" exact component={Workshops} />
          <Route path="/cocinas" exact component={Kitchens} />
          <Route path="/alojamientos" exact component={Lodgins} />
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
