import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import MemberModel from '../../models/MemberModel';

export const requestMembers = async () => {
  const endpoint = environment.api.members.replace(':id', '');
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestUpdateMember = async member => {
  const endpoint = environment.api.members.replace(':id', member.id);
  return await EffectUtility.putToModel(MemberModel, endpoint, member);
};

export const requestCreateMember = async member => {
  const endpoint = environment.api.members.replace(':id', '');
  return await EffectUtility.postToModel(MemberModel, endpoint, member);
};

export const requestDeleteMember = async id => {
  const endpoint = environment.api.members.replace(':id', id);
  console.log(endpoint);
  const response = await EffectUtility.deleteToModel(MemberModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};
