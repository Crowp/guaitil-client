import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import UserModel from '../../../../models/UserModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createUserDeleteRequestCommand } from './UserDeleteRequestCommand';

export class UserPostRequestCommand extends RollbackRequestCommand {
  constructor(user, member = null) {
    super();
    this.user = user;
    if (member) {
      this._setMember(member);
    }
  }
  executeRequest = async () => {
    const endpoint = environment.auth.users.replace(':id', 'register');
    const response = await EffectUtility.postToModel(UserModel, endpoint, this.user);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createUserDeleteRequestCommand(id).executeRequest();
    }
  };

  _setMember = member => (this.user.member = member);

  addMemberBeforeRequest = member => {
    this._setMember(member);
  };
}

export const createUserPostCommand = (user, member = null) => {
  return new UserPostRequestCommand(user, member);
};
