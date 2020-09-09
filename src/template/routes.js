import { version } from './config';
import { RoleEnum } from '../constants';
import {
  faClipboardCheck,
  faStore,
  faUsers,
  faHome,
  faStar,
  faAddressCard,
  faPhotoVideo
} from '@fortawesome/free-solid-svg-icons';

export const homeRoutes = {
  name: 'Home',
  to: '/',
  exact: true,
  icon: faHome,
  roles: [RoleEnum.Admin, RoleEnum.Associated, RoleEnum.SuperAdmin],
  children: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      exact: true
    },
    { to: '/dashboard-alt', name: 'Dashboard alt' },
    { to: '/feed', name: 'Feed', exact: true },
    { to: '/', name: 'Landing', exact: true }
  ]
};

export const ReviewRoutes = {
  name: 'Revisión',
  to: '/admin/reviews',
  exact: true,
  icon: faClipboardCheck,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    {
      to: '/admin/requests',
      name: 'Solicitudes',
      exact: true
    },
    { to: '/admin/acepteds', name: 'Aceptados', exact: true },
    { to: '/admin/denieds', name: 'Denegados', exact: true }
  ]
};

export const memberRoutes = {
  name: 'Miembros',
  to: '/admin/members',
  exact: true,
  icon: faUsers,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin]
};

export const LocalRoutes = {
  name: 'Locales',
  to: '/admin/locals',
  exact: true,
  icon: faStore
};

export const GaleryRoutes = {
  name: 'Galería',
  to: '/admin/gallery',
  exact: true,
  icon: faPhotoVideo,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    {
      to: '/admin/gallery',
      name: 'Ver',
      exact: true
    },
    { to: '/admin/gallery/add', name: 'Añadir', exact: true }
  ]
};

export const ReservationRoutes = {
  name: 'Reservas',
  to: '/admin/reservations',
  exact: true,
  icon: faAddressCard,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin]
};

export const ActivitiesRoutes = {
  name: 'Actividades',
  to: '/admin/activities',
  exact: true,
  icon: faStar,
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin]
};

export const authenticationRoutes = {
  name: 'Authentication',
  to: '/authentication',
  icon: 'lock',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    {
      to: '/authentication/card',
      name: 'Usuario',
      children: [
        { to: '/authentication/card/login', name: 'Login' },
        { to: '/authentication/card/logout', name: 'Logout' },
        { to: '/authentication/card/register', name: 'Register' },
        { to: '/authentication/card/forget-password', name: 'Forgot password' },
        { to: '/authentication/card/password-reset', name: 'Reset password' },
        { to: '/authentication/card/confirm-mail', name: 'Confirm mail' },
        { to: '/authentication/card/lock-screen', name: 'Lock screen' }
      ]
    },
    {
      to: '/authentication/wizard',
      name: 'Wizard'
    }
  ]
};

export const ECommerceRoutes = {
  name: 'E commerce',
  to: '/e-commerce',
  icon: 'cart-plus',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/e-commerce/products/list', name: 'Product list' },
    { to: '/e-commerce/products/grid', name: 'Product grid' },
    { to: '/e-commerce/product-details', name: 'Product details' },
    { to: '/e-commerce/customers', name: 'Customers' }
  ]
};

export const pageRoutes = {
  name: 'Pages',
  to: '/pages',
  icon: 'copy',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/pages/activity', name: 'Activity' },
    { to: '/pages/event-detail', name: 'Event detail' },
    { to: '/pages/event-create', name: 'Event create' },
    { to: '/pages/events', name: 'Events' },
    { to: '/pages/faq', name: 'Faq' },
    { to: '/pages/notifications', name: 'Notifications' },
    { to: '/pages/profile', name: 'Profile' },
    { to: '/pages/settings', name: 'Settings' },
    { to: '/pages/starter', name: 'Starter' },
    {
      to: '/errors',
      name: 'Errors',
      children: [{ to: '/errors/404', name: '404' }, { to: '/errors/500', name: '500' }]
    }
  ]
};
export const widgetsRoutes = {
  name: 'Widgets',
  to: '/widgets',
  exact: true,
  icon: 'poll',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  badge: {
    text: `New`,
    color: 'soft-success'
  }
};

export const emailRoutes = {
  name: 'Email',
  to: '/email',
  icon: 'envelope-open',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/email/inbox', name: 'Inbox' },
    { to: '/email/email-detail', name: 'Email detail' },
    { to: '/email/compose', name: 'Compose' }
  ]
};

export const documentationRoutes = {
  name: 'Documentation',
  to: '/documentation',
  exact: true,
  icon: 'book'
};

export const changelogRoutes = {
  name: 'ChangeLog',
  to: '/changelog',
  exact: true,
  icon: 'code-branch',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  badge: {
    text: `v${version}`,
    color: 'soft-primary'
  }
};

export const componentRoutes = {
  name: 'Components',
  to: '/components',
  icon: 'puzzle-piece',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/components/alerts', name: 'Alerts' },
    { to: '/components/accordions', name: 'Accordions' },
    { to: '/components/avatar', name: 'Avatar' },
    { to: '/components/badges', name: 'Badges' },
    { to: '/components/backgrounds', name: 'Backgrounds' },
    { to: '/components/breadcrumb', name: 'Breadcrumb' },
    { to: '/components/buttons', name: 'Buttons' },
    { to: '/components/cards', name: 'Cards' },
    { to: '/components/collapses', name: 'Collapses' },
    {
      to: '/components/carousel',
      name: 'Carousel',
      badge: {
        text: `New`
      }
    },
    { to: '/components/dropdowns', name: 'Dropdowns' },
    { to: '/components/forms', name: 'Forms' },
    { to: '/components/listgroups', name: 'List groups' },
    { to: '/components/modals', name: 'Modals' },
    { to: '/components/navs', name: 'Navs' },
    { to: '/components/navbars', name: 'Navbars' },
    {
      to: '/components/navbar-top',
      name: 'Navbar Top',
      badge: {
        text: `New`
      }
    },
    { to: '/components/pageheaders', name: 'Page headers' },
    { to: '/components/paginations', name: 'Paginations' },
    { to: '/components/popovers', name: 'Popovers' },
    { to: '/components/progress', name: 'Progress' },
    {
      to: '/components/sidepanel',
      name: 'Sidepanel',
      badge: {
        text: 'New'
      }
    },
    {
      to: '/components/spinners',
      name: 'Spinners',
      badge: {
        text: `New`
      }
    },

    { to: '/components/tables', name: 'Tables' },
    { to: '/components/tooltips', name: 'Tooltips' }
  ]
};

export const pluginRoutes = {
  name: 'Plugins',
  to: '/plugins',
  icon: 'plug',
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/plugins/bulk-select', name: 'Bulk select' },
    {
      to: '/plugins',
      name: 'Chart',
      children: [{ to: '/plugins/chart', name: 'Chart Js' }, { to: '/plugins/echarts', name: 'Echarts' }]
    },
    { to: '/plugins/countup', name: 'Countup' },
    { to: '/plugins/code-highlight', name: 'Code Highlight' },

    { to: '/plugins/datetime', name: 'Datetime' },
    { to: '/plugins/dropzone', name: 'Dropzone' },
    { to: '/plugins/emoji-mart', name: 'Emoji Mart' },
    { to: '/plugins/fontawesome', name: 'Fontawesome' },

    { to: '/plugins/image-lightbox', name: 'Image lightbox' },
    { to: '/plugins/lottie', name: 'Lottie' },
    {
      to: '/plugins',
      name: 'Map',
      children: [
        { to: '/plugins/leaflet-map', name: 'Leaflet map' },
        { to: '/plugins/google-map', name: 'Google map' },
        { to: '/plugins/echart-map', name: 'Echart Map' }
      ]
    },
    { to: '/plugins/plyr', name: 'Plyr' },
    { to: '/plugins/progressbar', name: 'Progressbar' },
    { to: '/plugins/react-hook-form', name: 'React Hook Form' },
    { to: '/plugins/select', name: 'Select' },
    { to: '/plugins/slick-carousel', name: 'Slick Carousel' },
    { to: '/plugins/scroll-bar', name: 'Scroll Bar' },
    { to: '/plugins/toastify', name: 'Toastify' },
    { to: '/plugins/typed', name: 'Typed' },
    { to: '/plugins/wysiwyg', name: 'WYSIWYG editor' }
  ]
};

export const utilityRoutes = {
  name: 'Utilities',
  to: '/utilities',
  icon: ['fab', 'hotjar'],
  roles: [RoleEnum.Admin, RoleEnum.SuperAdmin],
  children: [
    { to: '/utilities/borders', name: 'Borders' },
    { to: '/utilities/clearfix', name: 'Clearfix' },
    { to: '/utilities/closeIcon', name: 'Close icon' },
    { to: '/utilities/colors', name: 'Colors' },
    { to: '/utilities/display', name: 'Display' },
    { to: '/utilities/embed', name: 'Embed' },
    { to: '/utilities/figures', name: 'Figures' },
    { to: '/utilities/flex', name: 'Flex' },
    { to: '/utilities/grid', name: 'Grid' },
    { to: '/utilities/sizing', name: 'Sizing' },
    { to: '/utilities/spacing', name: 'Spacing' },
    { to: '/utilities/stretchedLink', name: 'Stretched link' },
    { to: '/utilities/typography', name: 'Typography' },
    { to: '/utilities/verticalAlign', name: 'Vertical align' },
    { to: '/utilities/visibility', name: 'Visibility' }
  ]
};

export default [
  homeRoutes,
  ActivitiesRoutes,
  ReviewRoutes,
  memberRoutes,
  LocalRoutes,
  GaleryRoutes,
  ReservationRoutes
  // pageRoutes,
  // emailRoutes,
  // ECommerceRoutes,
  // componentRoutes,
  // utilityRoutes,
  // pluginRoutes
];
