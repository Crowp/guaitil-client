import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import Loader from '../components/common/Loader';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';
import { RouteMap } from '../../constants';

const Landing = loadable(() => import('../../views/pages/landing/home'), { fallback: <Loader /> });
const Workshops = loadable(() => import('../../views/pages/landing/workshops'), { fallback: <Loader /> });
const Kitchens = loadable(() => import('../../views/pages/landing/kitchens'), { fallback: <Loader /> });
const Lodgins = loadable(() => import('../../views/pages/landing/lodgin'), { fallback: <Loader /> });
const Gallery = loadable(() => import('../../views/pages/landing/gallery'), { fallback: <Loader /> });
const IndividualLocal = loadable(() => import('../../views/pages/landing/individual-local'), {
  fallback: <Loader />
});
const Activities = loadable(() => import('../../views/pages/landing/activities'), { fallback: <Loader /> });
const ActivityDetail = loadable(() => import('../../views/pages/landing/activities/ActivityDetail'), {
  fallback: <Loader />
});
const LoginLayout = loadable(() => import('../../views/pages/auth/Login'), { fallback: <Loader /> });
const LogoutLayout = loadable(() => import('../../views/pages/auth/Logout'), { fallback: <Loader /> });

const Layout = () => {
  return (
    <Router fallback={<span />}>
      <Switch>
        <Route path={RouteMap.Home.root()} exact component={Landing} />
        <Route path={RouteMap.Home.gallery()} exact component={Gallery} />
        <Route path={RouteMap.Home.workshops()} exact component={Workshops} />
        <Route path={RouteMap.Home.kitchens()} exact component={Kitchens} />
        <Route path={RouteMap.Home.lodging()} exact component={Lodgins} />
        <Route path={RouteMap.Home.localIndivitual()} exact component={IndividualLocal} />
        <Route path={RouteMap.Home.activities()} exact component={Activities} />
        <Route path={RouteMap.Home.activityIndivitual()} exact component={ActivityDetail} />
        <Route path={RouteMap.Auth.login()} exact component={LoginLayout} />
        <Route path={RouteMap.Auth.logout()} exact component={LogoutLayout} />
        <Route path="/errors" component={ErrorLayout} />
        <Route component={DashboardLayout} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Router>
  );
};

export default Layout;
