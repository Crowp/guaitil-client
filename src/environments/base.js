/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi) {
  return {
    api: {
      persons: `${baseApi}/api/persons/:id`,
      locals: `${baseApi}/api/local/:id`,
      members: `${baseApi}/api/member/:id`,
      activities: `${baseApi}/api/activity/:id`,
      multimedia: `${baseApi}/api/multimedia/:id`,
      products: `${baseApi}/api/product/:id`,
      productReviews: `${baseApi}/api/product-review/:id`,
      gallery: `${baseApi}/api/gallery`,
      reservations: `${baseApi}/api/reservation/:id`,
      sales: `${baseApi}/api/sale/:id`
    },
    auth: {
      login: `${baseApi}/auth/login?password=:password&email=:email`,
      users: `${baseApi}/auth/:id`
    },
    isProduction: true,
    isDevelopment: false
  };
}
