import UserAction from './UserAction';
import BaseReducer from '../../utils/BaseReducer';

export default class PersonReducer extends BaseReducer {
  initialState = [];

  [UserAction.REQUEST_USER_FINISHED](state, action) {
    return [...action.payload];
  }
}
