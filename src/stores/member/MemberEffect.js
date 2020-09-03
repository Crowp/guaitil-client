import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import MemberModel from '../../models/MemberModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';

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
export const requestMemberById = async id => {
  const endpoint = environment.api.members.replace(':id', id);
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestDeleteMember = async id => {
  const endpoint = environment.api.members.replace(':id', id);
  console.log(endpoint);
  const response = await EffectUtility.deleteToModel(MemberModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};

export const requestCreateMemberWithUserWithLocal = async (member, local, user) => {
  const endpoint = environment.api.members.replace(':id', '');
  let multimedias = [];
  for (let media of local.multimedia) {
    const response = await MultimediaEffect.requestCreateMultimedia(media, 'local_', '_image');
    if (response instanceof HttpResponseModel) {
      return response;
    }
    multimedias = [...multimedias, response];
  }
  local.multimedia = [...multimedias];
  member.locals = [local];

  const responseMember = await EffectUtility.postToModel(MemberModel, endpoint, member);

  if (responseMember instanceof HttpResponseModel) {
    return responseMember;
  }
  const newUser = {
    ...user,
    member: responseMember
  };
  const responseUser = await UserEffect.requestCreateUser(newUser);
  if (responseUser instanceof HttpResponseModel) {
    return responseUser;
  }

  return responseMember;
};
