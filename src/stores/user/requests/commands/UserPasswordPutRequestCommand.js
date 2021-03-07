import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class UserPasswordPutRequestCommand extends RequestCommand {
  constructor(userId, password) {
    super();
    this.userId = userId;
    this.password = password;
  }
  executeRequest = async () => {
    const endpoint = environment.auth.users.replace(':id', `reset?id=${this.userId}&newPassword=${this.password}`);
    const response = await EffectUtility.putToModel(UserModel, endpoint);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };
}

export const createUserPasswordPutRequestCommand = (userId, password) => {
  return new UserPasswordPutRequestCommand(userId, password);
};
