import ActionUtility from '../../utils/ActionUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import * as PeopleEffect from './PeopleEffect';
import { ToastStatusEnum } from '../../constants';

export default class PeopleAction {
  static REQUEST_PEOPLE = 'PeopleAction.REQUEST_PEOPLE';
  static REQUEST_PEOPLE_FINISHED = 'ArticleAction.REQUEST_PEOPLE_FINISHED';

  static getPersons() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, PeopleAction.REQUEST_PEOPLE, PeopleEffect.requestPeople);
    };
  }

  static REQUEST_PEOPLE_UPDATE = 'PeopleAction.REQUEST_PEOPLE_UPDATE';
  static REQUEST_PEOPLE_UPDATE_FINISHED = 'PeopleAction.REQUEST_PEOPLE_UPDATE_FINISHED';
  static updatePerson(person) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        PeopleAction.REQUEST_PEOPLE_UPDATE,
        PeopleEffect.requestUpdatePerson,
        person
      );
    };
  }

  static REQUEST_PEOPLE_DELETE = 'PeopleAction.REQUEST_PEOPLE_DELETE';
  static REQUEST_PEOPLE_DELETE_FINISHED = 'PeopleAction.REQUEST_PEOPLE_DELETE_FINISHED';

  static deletePerson(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        PeopleAction.REQUEST_PEOPLE_DELETE,
        PeopleEffect.requestDeletePerson,
        id
      );
    };
  }

  static REQUEST_PEOPLE_CREATE = 'PeopleAction.REQUEST_PEOPLE_CREATE';
  static REQUEST_PEOPLE_CREATE_FINISHED = 'PeopleAction.REQUEST_PEOPLE_CREATE_FINISHED';

  static createPerson(person) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        PeopleAction.REQUEST_PEOPLE_CREATE,
        PeopleEffect.requestCreatePerson,
        person
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha creado una persona', ToastStatusEnum.Success));
      }
    };
  }
}
