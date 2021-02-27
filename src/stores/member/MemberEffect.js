import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import MemberModel from '../../models/MemberModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';

export const requestMembers = async () => {
  const endpoint = environment.api.members.replace(':id', '');
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestMembersWithoutUser = async () => {
  const endpoint = environment.api.members.replace(':id', 'members-without-users');
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestUpdateMember = async member => {
  const endpoint = environment.api.members.replace(':id', member.memberId);
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
  const response = await EffectUtility.deleteToModel(MemberModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestCreateMemberWithUserWithLocal = async (member, local, user) => {
  const endpoint = environment.api.members.replace(':id', '');
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(local.multimedia, 'local_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  local.multimedia = [...responseMultimediaList];
  member.locals = [local];

  const responseMember = await EffectUtility.postToModel(MemberModel, endpoint, member);

  if (responseMember instanceof HttpErrorResponseModel) {
    return responseMember;
  }
  const newUser = {
    ...user,
    member: responseMember
  };
  const responseUser = await UserEffect.requestCreateUser(newUser);
  if (responseUser instanceof HttpErrorResponseModel) {
    if (responseMember?.id) {
      await requestDeleteMember(responseMember.memberId);
    }
    return responseUser;
  }

  return responseMember;
};
