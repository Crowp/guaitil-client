import {
  faClipboardCheck,
  faStore,
  faUsers,
  faUserLock,
  faHome,
  faStar,
  faAddressCard,
  faPhotoVideo
} from '@fortawesome/free-solid-svg-icons';
import { version } from './config';
import { RoleEnum, RouteMap } from '../constants';

const homeRoutes = {
  name: 'Home',
  exact: true,
  icon: faHome,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    {
      to: RouteMap.Dashboard.root(),
      name: 'Dashboard',
      exact: true
    },
    { to: RouteMap.Home.root(), name: 'Landing', exact: true }
  ]
};

const ReviewRoutes = {
  name: 'Revisión',
  to: RouteMap.Reviews.root(),
  exact: true,
  icon: faClipboardCheck,
  roles: RoleEnum.AllAdmins
};

const ReviewMemberRoutes = {
  name: 'Revisión',
  to: '/member/reviews',
  exact: true,
  icon: faClipboardCheck,
  roles: [RoleEnum.Associated]
};

const memberRoutes = {
  name: 'Miembros',
  to: RouteMap.Member.root(),
  exact: true,
  icon: faUsers,
  roles: RoleEnum.AllAdmins
};

const UserRoutes = {
  name: 'Usuarios',
  to: RouteMap.User.root(),
  exact: true,
  icon: faUserLock,
  roles: [RoleEnum.SuperAdmin]
};

const LocalRoutes = {
  name: 'Locales',
  to: RouteMap.Local.root(),
  exact: true,
  icon: faStore,
  roles: RoleEnum.AllAdmins
};

const ReservationRoutes = {
  name: 'Reservas',
  to: RouteMap.Reservation.root(),
  exact: true,
  icon: faAddressCard,
  roles: RoleEnum.AllAdmins
};

const LocalMemberRoutes = {
  name: 'Locales',
  to: RouteMap.LocalMember.root(),
  exact: true,
  icon: faStore,
  roles: [RoleEnum.Associated]
};

const SaleMemberRoutes = {
  name: 'Ventas',
  to: RouteMap.Sale.root(),
  exact: true,
  icon: faStore,
  roles: [RoleEnum.Associated]
};

const GaleryRoutes = {
  name: 'Galería',
  to: RouteMap.Gallery.root(),
  exact: true,
  icon: faPhotoVideo,
  roles: RoleEnum.AllAdmins
};

const ActivitiesRoutes = {
  name: 'Actividades',
  to: RouteMap.Activity.root(),
  exact: true,
  icon: faStar,
  roles: RoleEnum.AllAdmins
};

export default [
  homeRoutes,
  GaleryRoutes,
  UserRoutes,
  LocalMemberRoutes,
  ReviewMemberRoutes,
  ActivitiesRoutes,
  ReviewRoutes,
  memberRoutes,
  LocalRoutes,
  ReservationRoutes,
  SaleMemberRoutes
];
