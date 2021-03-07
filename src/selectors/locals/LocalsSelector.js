import { createSelector } from 'reselect';
import { getLocalType } from '../../utils/LocalType';
import { LocalEnum } from '../../constants';

class LocalsSelector {
  static selectLocals(locals) {
    return LocalsSelector._createTableRows(locals);
  }

  static selectLocalLodgings(locals) {
    return locals.filter(locals => locals.localType === LocalEnum.Lodging);
  }

  static selectLocalKitchens(locals) {
    return locals.filter(locals => locals.localType === LocalEnum.Kitchen);
  }

  static selectLocalWorkshops(locals) {
    return locals.filter(locals => locals.localType === LocalEnum.Workshop);
  }

  static selectLocalOthers(locals) {
    return locals.filter(locals => locals.localType === LocalEnum.Others);
  }

  static _createTableRows(models) {
    return models.map(model => ({
      id: model.id,
      localName: model.localDescription.localName,
      description: model.localDescription.description,
      localType: getLocalType(model.localDescription.localType),
      address: model.localDescription.address.physicalAddress
    }));
  }

  static _localsToOptionRows(models) {
    return models.map(({ id, localDescription: { localName, localType }, member: { person: { id: dni } } }) => {
      return {
        value: id,
        label: `${getLocalType(localType)} - ${localName} - ${dni}`
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

export const selectLocalLodgings = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalLodgings
);

export const selectLocalKitchens = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalKitchens
);

export const selectLocalWorkshops = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalWorkshops
);

export const selectLocalOthers = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalOthers
);

export const selectLocalsOptions = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalsToOptions
);
