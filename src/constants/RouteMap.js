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
  ...localsRoutes
};

export default RouteMap;
