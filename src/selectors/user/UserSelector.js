import { createSelector } from 'reselect';
import { sortAdministratorsByUpdateAtDate } from '../../utils/sortByUpdateAtDate';

class UserSelector {
  static selectUsers(users) {
    return UserSelector._createTableRows(users);
  }

  static _createTableRows(models) {
    console.log(models);
    const administratorsSorted = sortAdministratorsByUpdateAtDate(models);
    return models.map(
      ({
        member: {
          person: { name, firstLastName, email, id: dni }
        },
        firstLogin,
        resetPassword,
        id
      }) => ({
        id,
        name,
        firstLastName,
        email,
        dni,
        isOnReset: firstLogin || resetPassword
      })
    );
  }
}

export default UserSelector;

export const selectUsers = createSelector(
  state => state.users,
  UserSelector.selectUsers
);
