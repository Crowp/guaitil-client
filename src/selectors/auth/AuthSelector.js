import { createSelector } from 'reselect';

export class AuthSelector {
  static selectAuthenticated({ authenticated }) {
    return authenticated;
  }

  static selectRoles({ roles = [] }) {
    return roles;
  }
}

export const selectAuthenticated = createSelector(
  state => state.auth,
  AuthSelector.selectAuthenticated
);

export const selectRoles = createSelector(
  state => state.auth,
  AuthSelector.selectRoles
);
