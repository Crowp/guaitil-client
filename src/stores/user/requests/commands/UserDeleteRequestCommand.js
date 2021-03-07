import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class UserDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.users.replace(':id', this.query);
    return await EffectUtility.deleteToModel(UserModel, endpoint);
  };
}

export const createUserDeleteRequestCommand = query => {
  return new UserDeleteRequestCommand(query);
};
