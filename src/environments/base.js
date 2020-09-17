/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi) {
  return {
    api: {
      cast: `${baseApi}/shows/:showId/cast`,
      episodes: `${baseApi}/shows/:showId/episodes`,
      shows: `${baseApi}/shows/:showId`,
      errorExample: 'https://httpstat.us/520',
      //api from the backend
      persons: `${baseApi}/api/persons/:id`,
      locals: `${baseApi}/api/local/:id`,
      members: `${baseApi}/api/member/:id`,
      activities: `${baseApi}/api/activity/:id`,
      multimedia: `${baseApi}/api/multimedia/:id`,
      products: `${baseApi}/api/product/:id`,
      productReviews: `${baseApi}/api/product-review/:id`,
      tours: `${baseApi}/api/tour/:id`,
      gallery: `${baseApi}/api/gallery`,
      reservations: `${baseApi}/api/reservation/:id`
    },
    auth: {
      login: `${baseApi}/auth/login?password=:password&email=:email`,
      users: `${baseApi}/auth/:id`
    },
    isProduction: true,
    isDevelopment: false
  };
}
