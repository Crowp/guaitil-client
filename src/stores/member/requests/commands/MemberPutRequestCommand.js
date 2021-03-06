import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import MemberModel from '../../../../models/MemberModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class MemberPutRequestCommand extends RequestCommand {
  constructor(member) {
    super();
    this.member = member;
  }

  executeRequest = async () => {
    const endpoint = environment.api.members.replace(':id', this.member.id);
    const response = await EffectUtility.putToModel(MemberModel, endpoint, this.member);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };
}

export const createMemberPutRequestCommand = local => {
  return new MemberPutRequestCommand(local);
};
