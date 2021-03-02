import { RequestPost } from './RequestPost';
import { createUserPostCommand } from './commands/UserPostRequestCommand';

export class UserPostRequest extends RequestPost {
  constructor(user, member = null) {
    super();
    this.userPostRequestCommand = createUserPostCommand(user, member);
  }

  onRequest = async () => await this.userPostRequestCommand.executeRequest();

  onRollback = async () => {
    await this.userPostRequestCommand.rollback();
  };
}

export const createUserPostRequest = (user, member = null) => {
  return new UserPostRequest(user, member);
};
