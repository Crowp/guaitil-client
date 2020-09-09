import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MemberManagement from '../member';
import LocalManagement from '../local';
import ReservationManagment from '../reservation';
import CreateReservation from '../reservation/CreateReservation';
import EditReservation from '../reservation/edit/EditReservation';
import CreateLocal from '../local/CreateLocal';
import EditLocal from '../local/EditLocal';
import CreateMember from '../member/CreateMember';
import EditMember from '../member/EditMember';
import GaleryManagement from '../gallery';
import GaleryNew from '../gallery/AddImages';
import ActivityManagement from '../activity/ActivityManagement';
import CreateActivity from '../activity/CreateActivity';
import EditActivity from '../activity/EditActivity';
import EditProduct from '../product/EditProduct';
import CreateProduct from '../product/CreateProduct';
import ProductManagment from '../product';
import { RoleEnum } from '../../constants';
import withRoles from '../../template/hoc/withRoles';

const ProductsRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ProductManagment} />
    <Route path={`${url}/create`} exact component={CreateProduct} />
    <Route path={`${url}/edit/:id`} exact component={EditProduct} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const MemberRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={MemberManagement} />
    <Route path={`${url}/create`} exact component={CreateMember} />
    <Route path={`${url}/edit/:id`} exact component={EditMember} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const GaleryRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={GaleryManagement} />
    <Route path={`${url}/add`} exact component={GaleryNew} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const LocalRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={LocalManagement} />
    <Route path={`${url}/create`} exact component={CreateLocal} />
    <Route path={`${url}/edit/:id`} exact component={EditLocal} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const ReservationRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReservationManagment} />
    <Route path={`${url}/create`} exact component={CreateReservation} />
    <Route path={`${url}/edit/:id`} exact component={EditReservation} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const ActivitiesRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ActivityManagement} />
    <Route path={`${url}/edit/:id`} exact component={EditActivity} />
    <Route path={`${url}/create`} exact component={CreateActivity} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const DashboardAdminRoutes = () => (
  <Switch>
    <Route path="/admin/members" component={MemberRoutes} />
    <Route path="/admin/locals" component={LocalRoutes} />
    <Route path="/admin/reservations" component={ReservationRoutes} />
    <Route path="/admin/gallery" component={GaleryRoutes} />
    <Route path="/admin/activities" component={ActivitiesRoutes} />
    <Route path="/member/products" component={ProductsRoutes} />
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardAdminRoutes;