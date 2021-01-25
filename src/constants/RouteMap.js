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

const RouteMap = {
  ...homeRoutes,
  ...dashboardRoutes,
  ...errorsRoutes,
  ...memberRoutes,
  ...localsRoutes
};

export default RouteMap;
