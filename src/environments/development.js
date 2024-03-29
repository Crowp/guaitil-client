import environment from './base';

const baseApi = 'http://localhost:8080';
const env = environment(baseApi);

const developmentEnv = {
  ...env,
  // override anything that gets added from base.
  api: {
    ...env.api
    // error200: `${baseApi}/api/v1/error-200`,
    // error500: `${baseApi}/api/v1/error-500`,
  },
  isProduction: false,
  isDevelopment: true
};

export default developmentEnv;
