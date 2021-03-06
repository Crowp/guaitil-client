import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import MemberModel from '../../../../models/MemberModel';
import { createMemberDeleteRequestCommand } from './MemberDeleteRequestCommand';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class MemberPostRequestCommand extends RollbackRequestCommand {
  constructor(member) {
    super();
    this.member = member;
  }

  addLocalBeforeRequest = local => {
    this.member.locals = [local];
  };

  addMultimediaBeforeRequest = files => {
    const locals = this.member.locals;
    if (locals.length === 1) {
      locals[0].multimedia = files;
    } else {
      throw new Error('solo se puede crear un miembro con un local en el momento de crear un miembro');
    }
  };

  executeRequest = async () => {
    const endpoint = environment.api.members.replace(':id', '');
    const response = await EffectUtility.postToModel(MemberModel, endpoint, this.member);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createMemberDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createMemberPostRequestCommand = local => {
  return new MemberPostRequestCommand(local);
};
