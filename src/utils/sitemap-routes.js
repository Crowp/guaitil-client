import React from 'react';
import { Route } from 'react-router';
import RouteMap from '../constants/RouteMap';

export default (
  <Route>
    <Route path={RouteMap.Home.root()} />
    <Route path={RouteMap.Home.team()} />
    <Route path={RouteMap.Home.gallery()} />
    <Route path={RouteMap.Home.workshops()} />
    <Route path={RouteMap.Home.kitchens()} />
    <Route path={RouteMap.Home.lodging()} />
    <Route path={RouteMap.Home.activities()} />
  </Route>
);
