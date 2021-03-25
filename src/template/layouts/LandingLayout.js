import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router';

import { RouteMap } from '../../constants';
import Loader from '../components/common/Loader';
import NavbarStandard from '../components/navbar/NavbarStandard';

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

const LandingLayout = () => {
  const isMatch = useRouteMatch({ path: RouteMap.Home.root(), exact: true });
  const match = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <NavbarStandard location={location} match={match} hasColor={!isMatch} />
      <Switch>
        <Route path={RouteMap.Home.root()} exact component={Landing} />
        <Route path={RouteMap.Home.gallery()} exact component={Gallery} />
        <Route path={RouteMap.Home.workshops()} exact component={Workshops} />
        <Route path={RouteMap.Home.kitchens()} exact component={Kitchens} />
        <Route path={RouteMap.Home.lodging()} exact component={Lodgins} />
        <Route path={RouteMap.Home.localIndivitual()} exact component={IndividualLocal} />
        <Route path={RouteMap.Home.activities()} exact component={Activities} />
        <Route path={RouteMap.Home.activityIndivitual()} exact component={ActivityDetail} />
      </Switch>
    </>
  );
};

export default LandingLayout;
