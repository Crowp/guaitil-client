import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import loadable from '@loadable/component';

import Loader from '../../template/components/common/Loader';
import { RoleEnum, RouteMap } from '../../constants';
import withRoles from '../../template/hoc/withRoles';

const ReservationManagment = loadable(() => import('../pages/reservation'), { fallback: <Loader /> });
const CreateReservation = loadable(() => import('../pages/reservation/CreateReservation'), { fallback: <Loader /> });
const EditReservation = loadable(() => import('../pages/reservation/EditReservation'), { fallback: <Loader /> });
const LocalManagement = loadable(() => import('../pages/local/admin'), { fallback: <Loader /> });
const LocalMemberManagement = loadable(() => import('../pages/local/member'), { fallback: <Loader /> });
const LocalDashboard = loadable(() => import('../pages/local/member/Local'), { fallback: <Loader /> });
const CreateSale = loadable(() => import('../pages/sale/CreateSale'), { fallback: <Loader /> });
const EditSale = loadable(() => import('../pages/sale/EditSale'), { fallback: <Loader /> });
const CreateLocal = loadable(() => import('../pages/local/admin/CreateLocal'), { fallback: <Loader /> });
const EditLocal = loadable(() => import('../pages/local/admin/EditLocal'), { fallback: <Loader /> });
const MemberManagement = loadable(() => import('../pages/member'), { fallback: <Loader /> });
const CreateMember = loadable(() => import('../pages/member/CreateMember'), { fallback: <Loader /> });
const EditMember = loadable(() => import('../pages/member/EditMember'), { fallback: <Loader /> });
const GaleryManagement = loadable(() => import('../pages/gallery'), { fallback: <Loader /> });
const GaleryNew = loadable(() => import('../pages/gallery/AddImages'), { fallback: <Loader /> });
const ActivityManagement = loadable(() => import('../pages/activity/ActivityManagement'), { fallback: <Loader /> });
const CreateActivity = loadable(() => import('../pages/activity/CreateActivity'), { fallback: <Loader /> });
const EditActivity = loadable(() => import('../pages/activity/EditActivity'), { fallback: <Loader /> });
const EditProduct = loadable(() => import('../pages/product/EditProduct'), { fallback: <Loader /> });
const SaleManagment = loadable(() => import('../pages/sale'), { fallback: <Loader /> });
const CreateProduct = loadable(() => import('../pages/product/CreateProduct'), { fallback: <Loader /> });
const UserManagement = loadable(() => import('../pages/user'), { fallback: <Loader /> });
const CreateUser = loadable(() => import('../pages/user/CreateUser'), { fallback: <Loader /> });
const EditUser = loadable(() => import('../pages/user/EditUser'), { fallback: <Loader /> });
const ReviewsMemberManagment = loadable(() => import('../pages/reviews/member'), { fallback: <Loader /> });
const ReviewsAdminManagment = loadable(() => import('../pages/reviews/admin'), { fallback: <Loader /> });
const EditAdminReview = loadable(() => import('../pages/reviews/admin/EditReview'), { fallback: <Loader /> });
const EditMemberReview = loadable(() => import('../pages/reviews/member/EditReview'), { fallback: <Loader /> });

const MemberRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={MemberManagement} />
    <Route path={`${url}/create`} exact component={CreateMember} />
    <Route path={`${url}/edit/:id`} exact component={EditMember} />

    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const GaleryRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={GaleryManagement} />
    <Route path={`${url}/add`} exact component={GaleryNew} />

    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const LocalRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={url} exact component={LocalManagement} />
    <Route path={RouteMap.Local.create()} exact component={CreateLocal} />
    <Route path={RouteMap.Local.edit()} exact component={EditLocal} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const UsersRoutes = withRoles([RoleEnum.SuperAdmin])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={UserManagement} />
    <Route path={`${url}/create`} exact component={CreateUser} />
    <Route path={`${url}/edit/:id`} exact component={EditUser} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const LocalMemberRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={LocalMemberManagement} />
    <Route path={`${url}/dashboard/:id`} exact component={LocalDashboard} />
    <Route path={`${url}/dashboard/:idLocal/product/create`} exact component={CreateProduct} />
    <Route path={`${url}/dashboard/:idLocal/product/edit/:id`} exact component={EditProduct} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const SaleMemberRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={SaleManagment} />
    <Route path={`${url}/create`} exact component={CreateSale} />
    <Route path={`${url}/edit/:id`} exact component={EditSale} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));
const ReviewsMemberRoutes = withRoles([RoleEnum.Associated])(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReviewsMemberManagment} />
    <Route path={`${url}/:id`} exact component={EditMemberReview} />
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const ReservationRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReservationManagment} />
    <Route path={`${url}/create`} exact component={CreateReservation} />
    <Route path={`${url}/edit/:id`} exact component={EditReservation} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const ActivitiesRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ActivityManagement} />
    <Route path={`${url}/edit/:id`} exact component={EditActivity} />
    <Route path={`${url}/create`} exact component={CreateActivity} />
    {/*Redirect*/}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));
///member/sale/edit/17

const ReviewsAdminRoutes = withRoles(RoleEnum.AllAdmins)(({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReviewsAdminManagment} />
    <Route path={`${url}/:id`} exact component={EditAdminReview} />
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
));

const DashboardAdminRoutes = () => (
  <Switch>
    {/* Admin dashboard */}
    {/* <Route path="/admin/members" component={MemberRoutes} /> */}
    <Route path={RouteMap.Local.root()} component={LocalRoutes} />
    <Route path="/admin/reservations" component={ReservationRoutes} />
    <Route path="/admin/gallery" component={GaleryRoutes} />
    <Route path="/admin/activities" component={ActivitiesRoutes} />
    <Route path="/admin/users" component={UsersRoutes} />
    <Route path="/admin/reviews" component={ReviewsAdminRoutes} />

    {/* Member dashboard */}
    {/* <Route path="/member/locals" component={LocalMemberRoutes} />
    <Route path="/member/sale" component={SaleMemberRoutes} />
    <Route path="/member/reviews" component={ReviewsMemberRoutes} /> */}

    {/* Redirect */}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
);

export default DashboardAdminRoutes;
