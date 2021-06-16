import { createSelector } from 'reselect';

class UserSelector {
  static selectUsers(users) {
    return UserSelector._createTableRows(users);
  }

  static _createTableRows(models) {
    return models.map(
      ({
        member: {
          person: { name, firstLastName, secondLastName, email, id: dni }
        },
        firstLogin,
        resetPassword,
        id
      }) => ({
        id,
        nameComplete: `${name} ${firstLastName} ${secondLastName}`,
        email,
        dni,
        isOnReset: resetPassword
      })
    );
  }
}

export default UserSelector;

export const selectUsers = createSelector(
  state => state.users,
  UserSelector.selectUsers
);
