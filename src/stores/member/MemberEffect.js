import environment from 'environment';
import EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';

import MemberModel from '../../models/MemberModel';

export default class MemberEffect {
  static requestMembers = async () => {
    const endpoint = environment.api.members.replace(':id', '');
    return await EffectUtility.getToModel(MemberModel, endpoint);
  };
  static requestUpdateMember = async member => {
    const endpoint = environment.api.members.replace(':id', member.id);
    return await EffectUtility.putToModel(MemberModel, endpoint, member);
  };
  static requestDeleteMember = async id => {
    const endpoint = environment.api.members.replace(':id', id);
    const response = await EffectUtility.deleteToModel(MemberModel, endpoint);
    return response instanceof HttpResponseModel ? response : id;
  };

  static requestCreateMember = async member => {
    const endpoint = environment.api.members.replace(':id', '');
    return await EffectUtility.postToModel(MemberModel, endpoint, member);
  };
}
