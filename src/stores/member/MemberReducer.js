import MemberAction from './MemberAction';
import BaseReducer from '../../utils/BaseReducer';

export default class MemberReducer extends BaseReducer {
  initialState = [];

  [MemberAction.REQUEST_MEMBER_FINISHED](state, action) {
    return [...action.payload];
  }

  [MemberAction.REQUEST_MEMBER_WITHOUT_USER_FINISHED](state, action) {
    return [...action.payload];
  }

  [MemberAction.REQUEST_MEMBER_UPDATE_FINISHED](state, action) {
    const member = action.payload;
    return [member, ...state.filter(model => model.memberId !== member.id)];
  }
  [MemberAction.REQUEST_MEMBER_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.memberId !== id)];
  }

  [MemberAction.REQUEST_MEMBER_CREATE_FINISHED](state, action) {
    const member = action.payload;
    return [member, ...state];
  }

  [MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL_FINISHED](state, action) {
    const member = action.payload;
    return [member, ...state];
  }

  [MemberAction.REQUEST_MEMBER_BY_ID_FINISHED](state, action) {
    const member = action.payload;
    return [member, ...state];
  }
}
