import { createSelector } from 'reselect';
import { getLocalType } from '../../utils/LocalType';

class LocalsSelector {
  static selectLocals(locals) {
    return LocalsSelector._createTableRows(locals);
  }

  static _createTableRows(models) {
    return models.map(model => ({
      id: model.id,
      name: model.name,
      description: model.description,
      telephone: model.telephone,
      localType: LocalsSelector.getLocalType(model.localType),
      multimedia: model.multimedia,
      address: model.address.physicalAddress
    }));
  }

  static _localsToOptionRows(models) {
    return models.map(({ name, id, localType, member: { person: { id: dni } } }) => {
      return {
        value: id,
        label: `${LocalsSelector.getLocalType(localType)} - ${name} - ${dni}`
      };
    });
  }
  static selectLocalsToOptions(members) {
    return LocalsSelector._localsToOptionRows(members);
  }
}
export default LocalsSelector;

export const selectLocals = createSelector(
  state => state.locals,
  LocalsSelector.selectLocals
);

export const selectLocalsOptions = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalsToOptions
);
