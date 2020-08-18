import MemberAction from './MemberAction';
import BaseReducer from '../../utils/BaseReducer';

export default class PersonReducer extends BaseReducer {
  initialState = [];

  [MemberAction.REQUEST_MEMBER_FINISHED](state, action) {
    return [...action.payload];
  }
  [MemberAction.REQUEST_MEMBER_UPDATE_FINISHED](state, action) {
    return [...action.payload];
  }
  [MemberAction.REQUEST_MEMBER_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [MemberAction.REQUEST_MEMBER_CREATE_FINISHED](state, action) {
    const person = action.payload;
    return [person, ...state];
  }
}
