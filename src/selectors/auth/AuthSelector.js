import { createSelector } from 'reselect';

export class AuthSelector {
  static selectAuthenticated({ authenticated }) {
    return authenticated;
  }

  static selectRoles({ roles = [] }) {
    return roles;
  }

  static selectLocalsMember({ locals = [] }) {
    return locals;
  }

  static selectAuthMemberId({ id }) {
    return id;
  }
  static selectAuth(auth) {
    return auth;
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

export const selectLocalsMember = createSelector(
  state => state.auth,
  AuthSelector.selectLocalsMember
);

export const selectAuthMemberId = createSelector(
  state => state.auth,
  AuthSelector.selectAuthMemberId
);
export const selectAuth = createSelector(
  state => state.auth,
  AuthSelector.selectAuth
);
