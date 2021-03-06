import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import MemberModel from '../../../../models/MemberModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class MemberDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.members.replace(':id', this.query);
    return await EffectUtility.deleteToModel(MemberModel, endpoint);
  };
}

export const createMemberDeleteRequestCommand = query => {
  return new MemberDeleteRequestCommand(query);
};
