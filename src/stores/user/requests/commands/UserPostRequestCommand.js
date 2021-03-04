import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { requestDeleteUser } from '../../../user/UserEffect';

export class UserPostRequestCommand extends RollbackRequestCommand {
  constructor(user, member = null) {
    super();
    this.user = user;
    if (member) {
      this.user.member = member;
    }
  }
  executeRequest = async () => {
    const endpoint = environment.auth.users.replace(':id', 'register');
    this.response = await EffectUtility.postToModel(UserModel, endpoint, this.user);
    this.ifResponseIsNotValidThrowsError();
    return this.response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.response?.id;
      return await requestDeleteUser(id);
    }
  };
}

export const createUserPostCommand = (user, member = null) => {
  return new UserPostRequestCommand(user, member);
};
