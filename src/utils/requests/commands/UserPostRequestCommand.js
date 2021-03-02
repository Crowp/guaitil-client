import { RequestCommand } from './RequestCommand';

import { requestCreateUser, requestDeleteUser } from '../../../stores/user/UserEffect';

export class UserPostRequestCommand extends RequestCommand {
  constructor(user, member = null) {
    super();
    this.user = user;
    if (member) {
      this.user.member = member;
    }
  }
  executeRequest = async () => {
    this.response = await requestCreateUser(this.user);
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
