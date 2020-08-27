import { createSelector } from 'reselect';

class LocalsSelector {
  static selectLocals(locals) {
    return LocalsSelector._createTableRows(locals);
  }

  static _createTableRows(models) {
    return models.map(({ local, ...model }) => ({
      id: local.id,
      name: local.name,
      description: local.description,
      telephone: local.telephone,
      localType: model.localType === 'KITCHEN' ? 'Cocina' : 'Taller',
      member: model.member,
      occupation: model.occupation,
      multimedia: model.multimedia
      //memebers
    }));
  }
}
export default LocalsSelector;

export const selectLocals = createSelector(
  state => state.locals,
  LocalsSelector.selectLocals
);
