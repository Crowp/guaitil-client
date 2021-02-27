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

  static selectAuthMemberId({ memberId }) {
    console.log(memberId);
    return memberId;
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
