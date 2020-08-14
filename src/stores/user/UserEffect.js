import environment from 'environment';
import EffectUtility from '../../utils/EffectUtility';

import UserModel from '../../models/UserModel';

export default class UserEffect {
  static requestUser = async filter => {
    const endpoint = environment.api.users.replace('/:id', `?filter=${filter}`);
    return await EffectUtility.getToModel(UserModel, endpoint);
  };
}
