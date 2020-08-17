import { createSelector } from 'reselect';

export class AuthSelector {
  static selectAuthenticated({ authenticated }) {
    return authenticated;
  }
}

export const selectAuthenticated = createSelector(
  state => state.auth,
  AuthSelector.selectAuthenticated
);
