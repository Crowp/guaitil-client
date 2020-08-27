import LocalAction from './LocalAction';
import BaseReducer from '../../utils/BaseReducer';

export default class LocalReducer extends BaseReducer {
  initialState = [];

  [LocalAction.REQUEST_LOCAL_FINISHED](state, action) {
    return [...action.payload];
  }

  [LocalAction.REQUEST_LOCAL_UPDATE_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state.filter(model => model.id !== local.id)];
  }

  [LocalAction.REQUEST_LOCAL_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [LocalAction.REQUEST_LOCAL_CREATE_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state];
  }

  [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state];
  }
}
