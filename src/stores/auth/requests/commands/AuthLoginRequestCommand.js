import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import AuthService from '../../../../services/AuthService';

export class AuthLoginRequestCommand extends RequestCommand {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  executeRequest = async () => {
    const endpoint = environment.auth.login.replace(':password', this.password).replace(':email', this.email);
    const response = await EffectUtility.postToModel(UserModel, endpoint);
    this.ifResponseIsNotValidThrowsError(response);
    if (response.token) {
      AuthService.setToken(response.token);
    }
    const { firstLogin, resetPassword, id: idUser } = AuthService.getProfile().user;
    const { member, roles } = response;
    return { ...member, roles, authenticated: true, firstLogin, resetPassword, idUser };
  };
}

export const createAuthLoginRequestCommand = (email, password) => {
  return new AuthLoginRequestCommand(email, password);
};
