import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MemberManagement from '../member';
import ReservationManagment from '../reservation';
import CreateReservation from '../reservation/CreateReservation';
import EditReservation from '../reservation/edit/EditReservation';
import LocalManagement from '../local/admin';
import LocalMemberManagement from '../local/member';
import LocalDashboard from '../local/member/Local';
import CreateLocal from '../local/admin/CreateLocal';
import EditLocal from '../local/admin/EditLocal';
import CreateMember from '../member/CreateMember';
import EditMember from '../member/EditMember';
import GaleryManagement from '../gallery';
import GaleryNew from '../gallery/AddImages';
import ActivityManagement from '../activity/ActivityManagement';
import CreateActivity from '../activity/CreateActivity';
import EditActivity from '../activity/EditActivity';
import EditProduct from '../product/EditProduct';
import CreateProduct from '../product/CreateProduct';
import { RoleEnum } from '../../constants';
import UserManagement from '../user';
import CreateUser from '../user/CreateUser';
import EditUser from '../user/EditUser';
import withRoles from '../../template/hoc/withRoles';

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

const UsersRoutes = withRoles([RoleEnum.SuperAdmin])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={UserManagement} />
    <Route path={`${url}/create`} exact component={CreateUser} />
    <Route path={`${url}/edit/:id`} exact component={EditUser} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const LocalMemberRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={LocalMemberManagement} />
    <Route path={`${url}/dashboard/:id`} exact component={LocalDashboard} />
    <Route path={`${url}/dashboard/:id/product/create`} exact component={CreateProduct} />
    <Route path={`${url}/dashboard/:idLocal/product/edit/:id`} exact component={EditProduct} />
    {/* <Route path={`${url}/create`} exact component={CreateLocal} />
    <Route path={`${url}/edit/:id`} exact component={EditLocal} /> */}
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
    {/* Admin dashboard */}
    <Route path="/admin/members" component={MemberRoutes} />
    <Route path="/admin/locals" component={LocalRoutes} />
    <Route path="/admin/reservations" component={ReservationRoutes} />
    <Route path="/admin/gallery" component={GaleryRoutes} />
    <Route path="/admin/activities" component={ActivitiesRoutes} />
    <Route path="/admin/users" component={UsersRoutes} />

    {/* Member dashboard */}
    <Route path="/member/locals" component={LocalMemberRoutes} />

    {/* Redirect */}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardAdminRoutes;
