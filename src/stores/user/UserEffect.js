import environment from 'environment';
import UserModel from '../../models/UserModel';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createUserPostRequest } from './requests/UserPostRequest';
import { createUserPasswordPutRequest } from './requests/UserPasswordPutRequest';
import { createUsersRequest } from './requests/UsersRequest';
import { createUserDeleteRequest } from './requests/UserDeleteRequest';
import { createUserRolesPutRequest } from './requests/UserRolesPutRequest';

export const requestUsers = async () => {
  return await createUsersRequest().getResponse();
};

export const requestUserById = async id => {
  return await createUsersRequest(id).getResponse();
};

export const requestUserByMemberId = async id => {
  return await createUsersRequest(`member/${id}`).getResponse();
};

export const requestUpdateUserRoles = async (id, roles) => {
  return await createUserRolesPutRequest(id, roles).getResponse();
};

export const resetPassword = async (id, newPassword) => {
  return await createUserPasswordPutRequest(id, newPassword).getResponse();
};

export const requestCreateUser = async user => {
  return await createUserPostRequest(user).getResponse();
};

export const requestDeleteUser = async id => {
  const response = await createUserDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};
