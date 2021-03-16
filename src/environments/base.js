/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi) {
  return {
    api: {
      persons: `${baseApi}/api/people/:id`,
      locals: `${baseApi}/api/locals/:id`,
      members: `${baseApi}/api/members/:id`,
      activities: `${baseApi}/api/activities/:id`,
      multimedia: `${baseApi}/api/multimedia/:id`,
      products: `${baseApi}/api/products/:id`,
      productReviews: `${baseApi}/api/products-reviews/:id`,
      gallery: `${baseApi}/api/gallery`,
      reservations: `${baseApi}/api/reservations/:id`,
      sales: `${baseApi}/api/sales/:id`
    },
    auth: {
      login: `${baseApi}/auth/login?password=:password&email=:email`,
      users: `${baseApi}/auth/:id`
    },
    isProduction: true,
    isDevelopment: false
  };
}
