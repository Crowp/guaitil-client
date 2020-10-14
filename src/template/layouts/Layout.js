import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import ProductProvider from '../components/e-commerce/ProductProvider';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';

const Landing = loadable(() => import('../components/landing/Landing'), { fallback: <Loader /> });
const Workshops = loadable(() => import('../../views/pages/clients/workshops'), { fallback: <Loader /> });
const Kitchens = loadable(() => import('../../views/pages/clients/kitchens'), { fallback: <Loader /> });
const Lodgins = loadable(() => import('../../views/pages/clients/lodgin'), { fallback: <Loader /> });
const Gallery = loadable(() => import('../../views/pages/clients/gallery'), { fallback: <Loader /> });
const IndividualLocal = loadable(() => import('../../views/pages/clients/individual-local'), {
  fallback: <Loader />
});
const Activities = loadable(() => import('../../views/pages/clients/activities'), { fallback: <Loader /> });
const ActivityDetail = loadable(() => import('../../views/pages/clients/activities/ActivityDetail'), {
  fallback: <Loader />
});
const LoginLayout = loadable(() => import('../../views/components/auth/Login'), { fallback: <Loader /> });
const LogoutLayout = loadable(() => import('../../views/components/auth/Logout'), { fallback: <Loader /> });

const Layout = () => {
  return (
    <ProductProvider>
      <Router fallback={<span />}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/galeria" exact component={Gallery} />
          <Route path="/talleres" exact component={Workshops} />
          <Route path="/cocinas" exact component={Kitchens} />
          <Route path="/alojamientos" exact component={Lodgins} />
          <Route path="/alojamientos/individual/:id" exact component={IndividualLocal} />
          <Route path="/cocinas/individual/:id" exact component={IndividualLocal} />
          <Route path="/talleres/individual/:id" exact component={IndividualLocal} />
          <Route path="/actividades" exact component={Activities} />
          <Route path="/actividades/individual/:id" exact component={ActivityDetail} />
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
