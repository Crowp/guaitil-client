import { createSelector } from 'reselect';
import { getLocalType } from '../../utils/LocalType';
import { LocalEnum } from '../../constants';
import { sortLocalsByUpdateAtDate } from '../../utils/sortByUpdateAtDate';
import StringUtil from '../../utils/StringUtil';

class LocalsSelector {
  static selectLocals(locals) {
    return LocalsSelector._createTableRows(locals);
  }

  static selectLocalLodgings(locals) {
    return locals.filter(locals => locals.localDescription.localType === LocalEnum.Lodging);
  }

  static selectLocalKitchens(locals) {
    return locals.filter(locals => locals.localDescription.localType === LocalEnum.Kitchen);
  }

  static selectLocalWorkshops(locals) {
    return locals.filter(locals => locals.localDescription.localType === LocalEnum.Workshop);
  }

  static selectLocalOthers(locals) {
    return locals.filter(locals => locals.localDescription.localType === LocalEnum.Others);
  }

  static selectLocalsByIdMember(locals, memberId) {
    return locals.filter(locals => locals.member.id === memberId);
  }

  static _createTableRows(models) {
    let localsSorted = sortLocalsByUpdateAtDate(models);
    return localsSorted.map(model => ({
      id: model.id,
      localName: model.localDescription.localName,
      description: StringUtil.cutWordFromMaxSize(model.localDescription.description, 50) + '...',
      localType: getLocalType(model.localDescription.localType),
      address: StringUtil.cutWordFromMaxSize(model.localDescription.address.physicalAddress, 50) + '...',
      show: model.showLocal,
      isOnReset: model.resetPassword
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

  static _localsDescriptionOptionRows(models) {
    return models.map(({ localDescription: { id, localName, localType }, member: { person: { id: dni } } }) => {
      return {
        value: id,
        label: `${getLocalType(localType)} - ${localName} - ${dni}`
      };
    });
  }
  static selectLocalsToOptions(members) {
    return LocalsSelector._localsToOptionRows(members);
  }
  static selectLocalsDescriptionToOptions(members) {
    return LocalsSelector._localsDescriptionOptionRows(members);
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
export const selectLocalsDescriptionOptions = createSelector(
  state => state.locals,
  LocalsSelector.selectLocalsDescriptionToOptions
);

export const selectLocalsByIdMember = createSelector(
  state => state.locals,
  (_, memberId) => memberId,
  LocalsSelector.selectLocalsByIdMember
);
