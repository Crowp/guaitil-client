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
const usersRoot = `${dashboardRoot}/users`;

const usersRoutes = {
  User: {
    root: () => usersRoot,
    create: () => `${usersRoot}/create`,
    edit: (id = ':id') => `${usersRoot}/${id}`
  }
};

const dashboardMemberRoot = `${dashboardRoot}/member`;
const salesRoot = `${dashboardMemberRoot}/sales`;

const salesRoutes = {
  Sale: {
    root: () => salesRoot,
    create: () => `${salesRoot}/create`,
    edit: (id = ':id') => `${salesRoot}/${id}`
  }
};

const localsMemberRoot = `${dashboardMemberRoot}/locals`;

const localMemberRoute = {
  LocalMember: {
    root: () => localsMemberRoot,
    individual: (localId = ':localId') => `${localsMemberRoot}/${localId}`,
    createProduct: (localId = ':localId') => `${localsMemberRoot}/product/create/${localId}`,
    editProduct: (localId = ':localId', id = ':id') => `${localsMemberRoot}/${localId}/product/edit/${id}`
  }
};

const RouteMap = {
  ...homeRoutes,
  ...usersRoutes,
  ...dashboardRoutes,
  ...errorsRoutes,
  ...memberRoutes,
  ...localsRoutes,
  ...reservationsRoutes,
  ...salesRoutes,
  ...localMemberRoute
};

export default RouteMap;
