import ActionUtility from '../../utils/ActionUtility';
import UserEffect from './UserEffect';

export default class UserAction {
  static REQUEST_USER = 'UserAction.REQUEST_USER';
  static REQUEST_USER_FINISHED = 'ArticleAction.REQUEST_USER_FINISHED';

  static getUsers(filter = 'all') {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER, UserEffect.requestUser, filter);
    };
  }
}
