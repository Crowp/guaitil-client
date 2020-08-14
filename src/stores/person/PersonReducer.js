import PersonAction from './PersonAction';
import BaseReducer from '../../utils/BaseReducer';

export default class PersonReducer extends BaseReducer {
  initialState = [];

  [PersonAction.REQUEST_PERSON_FINISHED](state, action) {
    return [...action.payload];
  }

  [PersonAction.REQUEST_PERSON_UPDATE_FINISHED](state, action) {
    return [...action.payload];
  }
  [PersonAction.REQUEST_PERSON_CREATE_FINISHED](state, action) {
    const person = action.payload;
    return [person, ...state];
  }
}
