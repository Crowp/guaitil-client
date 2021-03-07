import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class UserRolesPutRequestCommand extends RequestCommand {
  constructor(userId, roles) {
    super();
    this.userId = userId;
    this.roles = roles;
  }
  executeRequest = async () => {
    const endpoint = environment.api.users.replace(':id', `update-roles/${this.userId}`);
    const response = await EffectUtility.putToModel(UserModel, endpoint, this.roles);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };
}

export const createUserRolesPutRequestCommand = (userId, roles) => {
  return new UserRolesPutRequestCommand(userId, roles);
};
