import environment from 'environment';
import EffectUtility from '../../utils/EffectUtility';

import UserModel from '../../models/UserModel';

export default class UserEffect {
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
    return response instanceof HttpResponseModel ? response : id;
  };
  static requestCreateUser = async user => {
    const endpoint = environment.api.users.replace(':id', '');
    return await EffectUtility.postToModel(UserModel, endpoint, user);
  };
}
