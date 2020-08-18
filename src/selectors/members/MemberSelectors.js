import { createSelector } from 'reselect';

export class MemberSelector {
  static selectMembers(members) {
    return MemberSelector._createTableRows(members);
  }

  static _createTableRows(models) {
    return models.map(({ person, ...model }) => ({
      id: model.id,
      name: person.name,
      firstLastName: person.firstLastName,
      lastName: person.secondLastName,
      dni: person.id,
      memberType: model.memberType === 'REGULAR' ? 'Regular' : 'Asociado',
      email: person.email,
      telephone: person.telephone,
      occupation: model.occupation
    }));
  }
}

export const selectMembers = createSelector(
  state => state.members,
  MemberSelector.selectMembers
);
