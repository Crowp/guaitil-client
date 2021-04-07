import { createSelector } from 'reselect';

class UserSelector {
  static selectUsers(users) {
    return UserSelector._createTableRows(users);
  }

  static _createTableRows(models) {
    return models.map(({ member: { person: { name, firstLastName, email, id: dni } }, id }) => ({
      id,
      name,
      firstLastName,
      email,
      dni
    }));
  }
}

export default UserSelector;

export const selectUsers = createSelector(
  state => state.users,
  UserSelector.selectUsers
);
