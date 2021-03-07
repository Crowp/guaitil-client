import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class UsersRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.users.replace(':id', this.query);
    return await EffectUtility.getToModel(UserModel, endpoint);
  };
}

export const createUsersRequestCommand = query => {
  return new UsersRequestCommand(query);
};
