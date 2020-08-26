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
      localType: model.localType === 'COCINA' ? 'Cocina' : 'Taller',
      member: model.MemberModel,
      occupation: model.occupation,
      multimedia: model.MultimediaModel
    }));
  }
}
export default LocalsSelector;

export const selectLocals = createSelector(
  state => state.locals,
  LocalsSelector.selectLocals
);
