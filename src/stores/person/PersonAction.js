import ActionUtility from '../../utils/ActionUtility';
import PersonEffect from './PersonEffect';

export default class PersonAction {
  static REQUEST_PERSON = 'PersonAction.REQUEST_PERSON';
  static REQUEST_PERSON_FINISHED = 'ArticleAction.REQUEST_PERSON_FINISHED';

  static getPersons(filter = 'all') {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, PersonAction.REQUEST_PERSON, PersonEffect.requestPerson, filter);
    };
  }

  static REQUEST_PERSON_UPDATE = 'PersonAction.REQUEST_PERSON_UPDATE';
  static REQUEST_PERSON_UPDATE_FINISHED = 'PersonAction.REQUEST_PERSON_UPDATE_FINISHED';
  static updateArticle(person) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        PersonAction.REQUEST_PERSON_UPDATE,
        PersonEffect.requestUpdatePerson,
        person
      );
    };
  }

  static REQUEST_PERSON_DELETE = 'PersonAction.REQUEST_PERSON_DELETE';
  static REQUEST_PERSON_DELETE_FINISHED = 'PersonAction.REQUEST_PERSON_DELETE_FINISHED';

  static deletePerson(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        PersonAction.REQUEST_PERSON_DELETE,
        PersonEffect.requestDeletePerson,
        id
      );
    };
  }

  static REQUEST_PERSON_CREATE = 'PersonAction.REQUEST_PERSON_CREATE';
  static REQUEST_PERSON_CREATE_FINISHED = 'PersonAction.REQUEST_PERSON_CREATE_FINISHED';

  static createPerson(person, history) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        PersonAction.REQUEST_PERSON_CREATE,
        PersonEffect.requestCreatePerson,
        person
      );
      history.push('/');
    };
  }
}
