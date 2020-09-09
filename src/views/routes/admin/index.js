import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MemberManagement from '../../member';
import LocalManagement from '../../local';
import ReservationManagment from '../../reservation';
import CreateReservation from '../../reservation/CreateReservation';
import EditReservation from '../../reservation/edit/EditReservation';
import CreateLocal from '../../local/CreateLocal';
import EditLocal from '../../local/EditLocal';
import CreateMember from '../../member/CreateMember';
import EditMember from '../../member/EditMember';
import GaleryManagement from '../../gallery';
import GaleryNew from '../../gallery/AddImages';
import ActivityManagement from '../../activity/ActivityManagement';
import CreateActivity from '../../activity/CreateActivity';
import EditActivity from '../../activity/EditActivity';

// const ProductRoutes = ({ match: { url } }) => (
//   <Switch>
//     <Route path={`${url}/products/:productLayout`} exact component={Products} />
//     <Route path={`${url}/product-details/:id`} exact component={ProductDetails} />
//     <Route path={`${url}/product-details/`} exact component={ProductDetails} />
//     <Route path={`${url}/customers`} exact component={Customers} />

//     {/*Redirect*/}
//     <Redirect to="/errors/404" />
//   </Switch>
// );

const MemberRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={MemberManagement} />
    <Route path={`${url}/create`} exact component={CreateMember} />
    <Route path={`${url}/edit/:id`} exact component={EditMember} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const GaleryRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={GaleryManagement} />
    <Route path={`${url}/add`} exact component={GaleryNew} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const LocalRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={LocalManagement} />
    <Route path={`${url}/create`} exact component={CreateLocal} />
    <Route path={`${url}/edit/:id`} exact component={EditLocal} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const ReservationRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ReservationManagment} />
    <Route path={`${url}/create`} exact component={CreateReservation} />
    <Route path={`${url}/edit/:id`} exact component={EditReservation} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const ActivitiesRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}`} exact component={ActivityManagement} />
    <Route path={`${url}/edit/:id`} exact component={EditActivity} />
    <Route path={`${url}/create`} exact component={CreateActivity} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const DashboardAdminRoutes = () => (
  <Switch>
    {/* <Route path="/member/products" component={ProductRoutes} /> */}
    <Route path="/admin/members" component={MemberRoutes} />
    <Route path="/admin/locals" component={LocalRoutes} />
    <Route path="/admin/reservations" component={ReservationRoutes} />
    <Route path="/admin/gallery" component={GaleryRoutes} />
    <Route path="/admin/activities" component={ActivitiesRoutes} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardAdminRoutes;
