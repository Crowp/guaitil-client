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
      users: `${baseApi}/api/users/:id`,
      multimedia: `${baseApi}/api/multimedia/:id`,
      products: `${baseApi}/api/products/:id`,
      gallery: `${baseApi}/api/gallery`
    },
    auth: {
      login: `${baseApi}/auth/login?password=:password&email=:email`
    },
    isProduction: true,
    isDevelopment: false
  };
}
