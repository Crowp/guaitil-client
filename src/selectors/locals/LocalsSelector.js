import { createSelector } from 'reselect';

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
      localType: model.localType === 'KITCHEN' ? 'Cocina' : 'Taller',
      multimedia: model.multimedia,
      address: model.address.physicalAddress
      //memebers
    }));
  }
}
export default LocalsSelector;

export const selectLocals = createSelector(
  state => state.locals,
  LocalsSelector.selectLocals
);
