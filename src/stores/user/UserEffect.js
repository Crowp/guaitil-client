import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import UserModel from '../../models/UserModel';

export const requestUsers = async () => {
  const endpoint = environment.auth.users.replace(':id', '');
  return await EffectUtility.getToModel(UserModel, endpoint);
};

export const requestUpdateUser = async user => {
  const endpoint = environment.auth.users.replace(':id', user.id);
  return await EffectUtility.putToModel(UserModel, endpoint, user);
};

export const requestUpdateUserRoles = async (id, roles) => {
  const endpoint = environment.auth.users.replace(':id', `update-roles/${id}`);
  return await EffectUtility.putToModel(UserModel, endpoint, roles);
};

export const resetPassword = async (id, newPassword) => {
  const endpoint = environment.auth.users.replace(':id', `reset?id=${id}&newPassword=${newPassword}`);
  return await EffectUtility.putToModel(UserModel, endpoint);
};

export const requestCreateUser = async user => {
  const endpoint = environment.auth.users.replace(':id', 'register');
  return await EffectUtility.postToModel(UserModel, endpoint, user);
};
export const requestUserById = async id => {
  const endpoint = environment.auth.users.replace(':id', id);
  return await EffectUtility.getToModel(UserModel, endpoint);
};

export const requestUserByMemberId = async id => {
  const endpoint = environment.auth.users.replace(':id', `member/${id}`);
  debugger;
  return await EffectUtility.getToModel(UserModel, endpoint);
};

export const requestDeleteUser = async id => {
  const endpoint = environment.auth.users.replace(':id', id);
  const response = await EffectUtility.deleteToModel(UserModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};
