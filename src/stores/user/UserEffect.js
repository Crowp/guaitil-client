import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import UserModel from '../../models/UserModel';

export const requestUsers = async () => {
  const endpoint = environment.auth.users.replace(':id', '');
  return await EffectUtility.getToModel(UserModel, endpoint);
};

export const requestUpdateUser = async user => {
  const endpoint = environment.auth.users.replace(':id', user.id);
  return await EffectUtility.putToModel(UserModel, endpoint, user);
};

export const requestCreateUser = async user => {
  const endpoint = environment.auth.users.replace(':id', 'register');
  return await EffectUtility.postToModel(UserModel, endpoint, user);
};
export const requestUserById = async id => {
  const endpoint = environment.auth.users.replace(':id', id);
  return await EffectUtility.getToModel(UserModel, endpoint);
};

export const requestDeleteUser = async id => {
  const endpoint = environment.auth.users.replace(':id', id);
  console.log(endpoint);
  const response = await EffectUtility.deleteToModel(UserModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};
