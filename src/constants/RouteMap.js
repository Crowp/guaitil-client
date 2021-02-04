const homeRoot = '/';

const homeRoutes = {
  Home: {
    root: () => homeRoot
  }
};

const dashboardRoot = '/dashboard';

const dashboardRoutes = {
  Dashboard: {
    root: () => dashboardRoot
  }
};

const errorsRoot = `/errors`;

const errorsRoutes = {
  Errors: {
    root: () => errorsRoot,
    notFound: () => `${errorsRoot}/404`
  }
};

const membersRoot = `${dashboardRoot}/members`;

const memberRoutes = {
  Member: {
    root: () => membersRoot,
    create: () => `${membersRoot}/create`,
    edit: (id = ':id') => `${membersRoot}/${id}`
  }
};

const localsRoot = `${dashboardRoot}/locals`;

const localsRoutes = {
  Local: {
    root: () => localsRoot,
    create: () => `${localsRoot}/create`,
    edit: (id = ':id') => `${localsRoot}/${id}`
  }
};

const reservationsRoot = `${dashboardRoot}/reservations`;

const reservationsRoutes = {
  Reservation: {
    root: () => reservationsRoot,
    create: () => `${reservationsRoot}/create`,
    edit: (id = ':id') => `${reservationsRoot}/${id}`
  }
};

const dashboardMemberRoot = '/member';
const salesRoot = `${dashboardMemberRoot}/sales`;

const salesRoutes = {
  Sale: {
    root: () => salesRoot,
    create: () => `${salesRoot}/create`,
    edit: (id = ':id') => `${salesRoot}/${id}`
  }
};

const localsMemberRoot = `${dashboardMemberRoot}/locals`;

const individualLocalRoot = (id = ':id') => `${localsMemberRoot}/dashboard/${id}`;

const productRoutes = {
  Product: {
    root: () => localsMemberRoot,
    individualLocalRoot: (id = ':id') => individualLocalRoot(id),
    create: (idLocal = ':id') => `${individualLocalRoot(idLocal)}/product/create`,
    edit: (idLocal = ':id', id = ':id') => `${individualLocalRoot(idLocal)}/product/edit/${id}`
  }
};

const RouteMap = {
  ...homeRoutes,
  ...dashboardRoutes,
  ...errorsRoutes,
  ...memberRoutes,
  ...localsRoutes,
  ...reservationsRoutes,
  ...salesRoutes,
  ...productRoutes
};

export default RouteMap;
