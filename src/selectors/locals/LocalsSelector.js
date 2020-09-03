import { createSelector } from 'reselect';
import { LocalEnum } from '../../constants';

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
    }));
  }

  static _localsToOptionRows(models) {
    return models.map(({ name, id, localType }) => {
      let typeName = '';
      switch (localType) {
        case LocalEnum.Kitchen:
          typeName = 'Cocina';
          break;
        case LocalEnum.Workshop:
          typeName = 'Taller';
          break;
        case LocalEnum.Lodging:
          typeName = 'Alojamiento';
          break;
        case LocalEnum.Others:
          typeName = 'Otros';
          break;
        default:
          typeName = 'No Encontrado';
      }
      return {
        value: id,
        label: `${typeName} - ${name}`
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
