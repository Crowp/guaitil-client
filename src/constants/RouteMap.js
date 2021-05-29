const homeRoot = '/landing';

const kitchens = 'kitchens';
const lodging = 'lodging';
const workshops = 'craft-workshops';
const Home = {
  root: () => homeRoot,
  gallery: () => `${homeRoot}/gallery`,
  team: () => `${homeRoot}/team`,
  kitchens: () => `${homeRoot}/${kitchens}`,
  lodging: () => `${homeRoot}/${lodging}`,
  workshops: () => `${homeRoot}/${workshops}`,
  activities: () => `${homeRoot}/activities`,
  activityIndivitual: (id = ':id') => `${homeRoot}/activities/${id}`,
  localIndivitual: (id = ':id') => `${homeRoot}/(${kitchens}|${lodging}|${workshops})/${id}`,
  kitchenIndividual: id => `${homeRoot}/${kitchens}/${id}`,
  lodgingIndividual: id => `${homeRoot}/${lodging}/${id}`,
  workshopsIndividual: id => `${homeRoot}/${workshops}/${id}`
};

const authenticationRoot = '/authentication';

const Auth = {
  root: () => authenticationRoot,
  login: () => `${authenticationRoot}/login`,
  logout: () => `${authenticationRoot}/logout`,
  resetPassword: () => `${authenticationRoot}/resetPassword`
};

const dashboardRoot = '/dashboard';

const Dashboard = {
  root: () => dashboardRoot
};

const errorsRoot = `/errors`;

const Errors = {
  root: () => errorsRoot,
  notFound: () => `${errorsRoot}/404`
};

const membersRoot = `${dashboardRoot}/members`;

const Member = {
  root: () => membersRoot,
  create: () => `${membersRoot}/create`,
  edit: (id = ':id') => `${membersRoot}/${id}`
};

const reviewMemberRoot = `/member/reviews`;

const ReviewsMember = {
  root: () => reviewMemberRoot,
  create: () => `${reviewMemberRoot}/create`,
  edit: (id = ':id') => `${reviewMemberRoot}/${id}`
};

const localsRoot = `${dashboardRoot}/locals`;

const Local = {
  root: () => localsRoot,
  create: () => `${localsRoot}/create`,
  edit: (id = ':id') => `${localsRoot}/${id}`
};

const reservationsRoot = `${dashboardRoot}/reservations`;

const Reservation = {
  root: () => reservationsRoot,
  create: () => `${reservationsRoot}/create`,
  edit: (id = ':id') => `${reservationsRoot}/${id}`
};

const activitiesRoot = `${dashboardRoot}/activities`;

const Activity = {
  root: () => activitiesRoot,
  create: () => `${activitiesRoot}/create`,
  edit: (id = ':id') => `${activitiesRoot}/${id}`
};
const reviewRoutes = `${dashboardRoot}/reviews`;

const Reviews = {
  root: () => reviewRoutes,
  create: () => `${reviewRoutes}/create`,
  edit: (id = ':id') => `${reviewRoutes}/${id}`
};
const usersRoot = `${dashboardRoot}/administrators`;

const User = {
  root: () => usersRoot,
  create: () => `${usersRoot}/create`,
  edit: (id = ':id') => `${usersRoot}/${id}`
};

const dashboardMemberRoot = `/member`;
const salesRoot = `${dashboardMemberRoot}/sales`;

const Sale = {
  root: () => salesRoot,
  create: () => `${salesRoot}/create`,
  edit: (id = ':id') => `${salesRoot}/${id}`
};

const localsMemberRoot = `/locals`;
const LocalMember = {
  root: () => localsMemberRoot,
  individual: (localId = ':localId') => `${localsMemberRoot}/${localId}`,
  createProduct: (localId = ':localId') => `${localsMemberRoot}/product/create/${localId}`,
  editProduct: (localId = ':localId', id = ':id') => `${localsMemberRoot}/${localId}/product/edit/${id}`
};

const galleryRoot = `${dashboardRoot}/gallery`;

const Gallery = {
  root: () => galleryRoot
};

const RouteMap = {
  Home,
  Auth,
  User,
  Dashboard,
  Errors,
  Member,
  Local,
  Reservation,
  Sale,
  LocalMember,
  Activity,
  Reviews,
  Gallery,
  ReviewsMember
};

export default RouteMap;
