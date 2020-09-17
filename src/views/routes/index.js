import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReservationManagment from '../pages/reservation';
import CreateReservation from '../pages/reservation/CreateReservation';
import EditReservation from '../pages/reservation/EditReservation';
import LocalManagement from '../pages/local/admin';
import LocalMemberManagement from '../pages/local/member';
import LocalDashboard from '../pages/local/member/Local';
import CreateLocal from '../pages/local/admin/CreateLocal';
import EditLocal from '../pages/local/admin/EditLocal';
import MemberManagement from '../pages/member';
import CreateMember from '../pages/member/CreateMember';
import EditMember from '../pages/member/EditMember';
import GaleryManagement from '../pages/gallery';
import GaleryNew from '../pages/gallery/AddImages';
import ActivityManagement from '../pages/activity/ActivityManagement';
import CreateActivity from '../pages/activity/CreateActivity';
import EditActivity from '../pages/activity/EditActivity';
import EditProduct from '../pages/product/EditProduct';
import CreateProduct from '../pages/product/CreateProduct';
import { RoleEnum } from '../../constants';
import UserManagement from '../user';
import CreateUser from '../user/CreateUser';
import EditUser from '../user/EditUser';
import ReviewsMemberManagment from '../pages/reviews/member';
import ReviewsAdminManagment from '../pages/reviews/admin';
import EditAdminReview from '../pages/reviews/admin/EditReview';
import EditMemberReview from '../pages/reviews/member/EditReview';
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
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
));

const ReviewsMemberRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReviewsMemberManagment} />
    <Route path={`${url}/:id`} exact component={EditMemberReview} />
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

const ReviewsAdminRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReviewsAdminManagment} />
    <Route path={`${url}/:id`} exact component={EditAdminReview} />
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
    <Route path="/admin/reviews" component={ReviewsAdminRoutes} />

    {/* Member dashboard */}
    <Route path="/member/locals" component={LocalMemberRoutes} />
    <Route path="/member/reviews" component={ReviewsMemberRoutes} />

    {/* Redirect */}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardAdminRoutes;
