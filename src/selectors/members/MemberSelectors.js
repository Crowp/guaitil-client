import { createSelector } from 'reselect';

class MemberSelector {
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
  static _memberToOptionRows(models) {
    return models.map(({ person, ...model }) => ({
      value: model.id,
      label: `${person.id} - ${person.name} ${person.firstLastName}`
    }));
  }
  static selectMemberToOptions(members) {
    return MemberSelector._memberToOptionRows(members);
  }
}

export default MemberSelector;

export const selectMembers = createSelector(
  state => state.members,
  MemberSelector.selectMembers
);

export const selectMembersOptions = createSelector(
  state => state.members,
  MemberSelector.selectMemberToOptions
);
