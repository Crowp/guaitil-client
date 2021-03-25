import { createSelector } from 'reselect';

class MemberSelector {
  static selectMembers(members) {
    return MemberSelector._createTableRows(members);
  }
  static filterMembers(members, memberType) {
    const data = members.filter(members => members.memberType === memberType);
    return data;
  }
  static selectAssociates(members) {
    const associates = MemberSelector.filterMembers(members, 'ASSOCIATED');
    return associates;
  }
  static selectRegularMembers(members) {
    const regularMember = MemberSelector.filterMembers(members, 'REGULAR');
    return regularMember;
  }
  static _createTableRows(models) {
    return models.map(({ person, ...model }) => ({
      id: model.id,
      name: person.name,
      firstLastName: person.firstLastName,
      secondLastName: person.secondLastName,
      dni: person.id,
      memberType: model.memberType === 'REGULAR' ? 'Regular' : 'Asociado'
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
export const selectAssociates = createSelector(
  state => state.members,
  MemberSelector.selectAssociates
);
export const selectRegularMembers = createSelector(
  state => state.members,
  MemberSelector.selectRegularMembers
);
export const selectMembersOptions = createSelector(
  state => state.members,
  MemberSelector.selectMemberToOptions
);
