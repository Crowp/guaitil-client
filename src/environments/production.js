import environment from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://www.guaitil.me:8080';
const env = environment(baseApi);

const productionEnv = {
  ...env
  // override anything that gets added from base.
};

export default productionEnv;
