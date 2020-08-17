import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import EffectUtility from '../../utils/EffectUtility';
import AuthService from '../../services/AuthService';

import UserModel from '../../models/UserModel';

export default class UserEffect {
  static requestVerifyLogin = async authenticated => {
    if (AuthService.loggedIn()) {
      if (!authenticated) {
        const user = AuthService.getProfile().user_data;
        return { authenticated: true, ...user };
      }
    } else {
      return { authenticated: false };
    }
  };

  static requestLogin = async (email, password) => {
    const endpoint = environment.auth.login.replace(':password', password).replace(':email', email);
    const response = await EffectUtility.postToModel(UserModel, endpoint);
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }
    if (response.token) {
      AuthService.setToken(response.token);
    }
    return { ...response, authenticated: true };
  };
  static requestUser = async filter => {
    const endpoint = environment.api.users.replace('/:id', `?filter=${filter}`);
    return await EffectUtility.getToModel(UserModel, endpoint);
  };

  static requestUpdateUser = async user => {
    const endpoint = environment.api.users.replace(':id', user.id);
    return await EffectUtility.putToModel(UserModel, endpoint, user);
  };
  static requestDeleteUser = async id => {
    const endpoint = environment.api.users.replace(':id', id);
    const response = await EffectUtility.deleteToModel(UserModel, endpoint);
    return response instanceof HttpErrorResponseModel ? response : id;
  };
  static requestCreateUser = async user => {
    const endpoint = environment.api.users.replace(':id', '');
    return await EffectUtility.postToModel(UserModel, endpoint, user);
  };
}
