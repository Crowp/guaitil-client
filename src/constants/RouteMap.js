const homeRoot = '/landing';

const kitchens = 'kitchens';
const lodging = 'lodging';
const workshops = 'craft-workshops';
const homeRoutes = {
  Home: {
    root: () => homeRoot,
    gallery: () => `${homeRoot}/gallery`,
    kitchens: () => `${homeRoot}/${kitchens}`,
    lodging: () => `${homeRoot}/${lodging}`,
    workshops: () => `${homeRoot}/${workshops}`,
    activities: () => `${homeRoot}/activities`,
    activityIndivitual: (id = ':id') => `${homeRoot}/activities/${id}`,
    localIndivitual: (id = ':id') => `${homeRoot}/(${kitchens}|${lodging}|${workshops})/${id}`,
    kitchenIndividual: id => `${homeRoot}/${kitchens}/${id}`,
    lodgingIndividual: id => `${homeRoot}/${lodging}/${id}`,
    workshopsIndividual: id => `${homeRoot}/${workshops}/${id}`
  }
};

const authenticationRoot = '/authentication';

const authenticationRoutes = {
  Auth: {
    root: () => authenticationRoot,
    login: () => `${authenticationRoot}/login`,
    logout: () => `${authenticationRoot}/logout`,
    resetPassword: () => `${authenticationRoot}/resetPassword`
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

const reviewMemberRoot = `/member/reviews`;

const ReviewsMembersRoutes = {
  ReviewsMember: {
    root: () => reviewMemberRoot,
    create: () => `${reviewMemberRoot}/create`,
    edit: (id = ':id') => `${reviewMemberRoot}/${id}`
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

const activitiesRoot = `${dashboardRoot}/activities`;

const ActivitiesRoutes = {
  Activity: {
    root: () => activitiesRoot,
    create: () => `${activitiesRoot}/create`,
    edit: (id = ':id') => `${activitiesRoot}/${id}`
  }
};
const reviewRoutes = `${dashboardRoot}/reviews`;

const ReviewsRoutes = {
  Reviews: {
    root: () => reviewRoutes,
    create: () => `${reviewRoutes}/create`,
    edit: (id = ':id') => `${reviewRoutes}/${id}`
  }
};
const usersRoot = `${dashboardRoot}/administrators`;

const usersRoutes = {
  User: {
    root: () => usersRoot,
    create: () => `${usersRoot}/create`,
    edit: (id = ':id') => `${usersRoot}/${id}`
  }
};

const dashboardMemberRoot = `/member`;
const salesRoot = `${dashboardMemberRoot}/sales`;

const salesRoutes = {
  Sale: {
    root: () => salesRoot,
    create: () => `${salesRoot}/create`,
    edit: (id = ':id') => `${salesRoot}/${id}`
  }
};

const localsMemberRoot = `/locals`;
const localMemberRoute = {
  LocalMember: {
    root: () => localsMemberRoot,
    individual: (localId = ':localId') => `${localsMemberRoot}/${localId}`,
    createProduct: (localId = ':localId') => `${localsMemberRoot}/product/create/${localId}`,
    editProduct: (localId = ':localId', id = ':id') => `${localsMemberRoot}/${localId}/product/edit/${id}`
  }
};

const galleryRoot = `${dashboardRoot}/gallery`;

const galleryrRoute = {
  Gallery: {
    root: () => galleryRoot
  }
};

const RouteMap = {
  ...homeRoutes,
  ...authenticationRoutes,
  ...usersRoutes,
  ...dashboardRoutes,
  ...errorsRoutes,
  ...memberRoutes,
  ...localsRoutes,
  ...reservationsRoutes,
  ...salesRoutes,
  ...localMemberRoute,
  ...ActivitiesRoutes,
  ...ReviewsRoutes,
  ...galleryrRoute,
  ...ReviewsMembersRoutes
};

export default RouteMap;
