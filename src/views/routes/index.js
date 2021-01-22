import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import loadable from '@loadable/component';

import Loader from '../../template/components/common/Loader';
import { RoleEnum, RouteMap } from '../../constants';
import withRoles from '../../template/hoc/withRoles';

const ReservationManagment = loadable(() => import('../pages/dashboard-admin/reservation'), { fallback: <Loader /> });
const CreateReservation = loadable(() => import('../pages/dashboard-admin/reservation/CreateReservation'), {
  fallback: <Loader />
});
const EditReservation = loadable(() => import('../pages/dashboard-admin/reservation/EditReservation'), {
  fallback: <Loader />
});

const LocalManagement = loadable(() => import('../pages/dashboard-admin/locals'), { fallback: <Loader /> });
const CreateLocal = loadable(() => import('../pages/dashboard-admin/locals/CreateLocal'), { fallback: <Loader /> });
const EditLocal = loadable(() => import('../pages/dashboard-admin/locals/EditLocalNew'), { fallback: <Loader /> });
const LocalDashboard = loadable(() => import('../pages/dashboard-member/locals/Local'), { fallback: <Loader /> });
const LocalMemberManagement = loadable(() => import('../pages/dashboard-member/locals'), { fallback: <Loader /> });

const SaleManagment = loadable(() => import('../pages/dashboard-member/sale'), { fallback: <Loader /> });
const CreateSale = loadable(() => import('../pages/dashboard-member/sale/CreateSale'), { fallback: <Loader /> });
const EditSale = loadable(() => import('../pages/dashboard-member/sale/EditSale'), { fallback: <Loader /> });

const MemberManagement = loadable(() => import('../pages/dashboard-admin/member'), { fallback: <Loader /> });
const CreateMember = loadable(() => import('../pages/dashboard-admin/member/CreateMember'), { fallback: <Loader /> });
const EditMember = loadable(() => import('../pages/dashboard-admin/member/EditMember'), { fallback: <Loader /> });

const GaleryManagement = loadable(() => import('../pages/dashboard-admin/gallery'), { fallback: <Loader /> });
const GaleryNew = loadable(() => import('../pages/dashboard-admin/gallery/AddImages'), { fallback: <Loader /> });

const ActivityManagement = loadable(() => import('../pages/dashboard-admin/activity/ActivityManagement'), {
  fallback: <Loader />
});
const CreateActivity = loadable(() => import('../pages/dashboard-admin/activity/CreateActivity'), {
  fallback: <Loader />
});
const EditActivity = loadable(() => import('../pages/dashboard-admin/activity/EditActivity'), { fallback: <Loader /> });

const EditProduct = loadable(() => import('../pages/dashboard-member/product/EditProduct'), { fallback: <Loader /> });
const CreateProduct = loadable(() => import('../pages/dashboard-member/product/CreateProduct'), {
  fallback: <Loader />
});

const UserManagement = loadable(() => import('../pages/dashboard-admin/user'), { fallback: <Loader /> });
const CreateUser = loadable(() => import('../pages/dashboard-admin/user/CreateUser'), { fallback: <Loader /> });
const EditUser = loadable(() => import('../pages/dashboard-admin/user/EditUser'), { fallback: <Loader /> });

const ReviewsMemberManagment = loadable(() => import('../pages/dashboard-member/reviews'), { fallback: <Loader /> });
const ReviewsAdminManagment = loadable(() => import('../pages/dashboard-admin/reviews'), { fallback: <Loader /> });
const EditAdminReview = loadable(() => import('../pages/dashboard-admin/reviews/EditReview'), { fallback: <Loader /> });
const EditMemberReview = loadable(() => import('../pages/dashboard-member/reviews/EditReview'), {
  fallback: <Loader />
});

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
    <Route path="/admin/members" component={MemberRoutes} />
    <Route path={RouteMap.Local.root()} component={LocalRoutes} />
    <Route path="/admin/reservations" component={ReservationRoutes} />
    <Route path="/admin/gallery" component={GaleryRoutes} />
    <Route path="/admin/activities" component={ActivitiesRoutes} />
    <Route path="/admin/users" component={UsersRoutes} />
    <Route path="/admin/reviews" component={ReviewsAdminRoutes} />

    {/* Member dashboard */}
    <Route path="/member/locals" component={LocalMemberRoutes} />
    <Route path="/member/sale" component={SaleMemberRoutes} />
    <Route path="/member/reviews" component={ReviewsMemberRoutes} />

    {/* Redirect */}
    <Redirect to={RouteMap.Errors.notFound()} />
  </Switch>
);

export default DashboardAdminRoutes;
