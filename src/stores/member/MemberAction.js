import ActionUtility from '../../utils/ActionUtility';
import MemberEffect from './MemberEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import ToastStatusEnum from '../../constants/ToastStatusEnum';

export default class MemberAction {
  static REQUEST_MEMBER = 'MemberAction.REQUEST_MEMBER';
  static REQUEST_MEMBER_FINISHED = 'MemberAction.REQUEST_MEMBER_FINISHED';

  static getMembers() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, MemberAction.REQUEST_MEMBER, MemberEffect.requestMembers);
    };
  }

  static REQUEST_MEMBER_UPDATE = 'MemberAction.REQUEST_MEMBER_UPDATE';
  static REQUEST_MEMBER_UPDATE_FINISHED = 'MemberAction.REQUEST_MEMBER_UPDATE_FINISHED';
  static updateMember(person) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_UPDATE,
        MemberEffect.requestUpdateMember,
        person
      );
    };
  }

  static REQUEST_MEMBER_DELETE = 'MemberAction.REQUEST_MEMBER_DELETE';
  static REQUEST_MEMBER_DELETE_FINISHED = 'MemberAction.REQUEST_MEMBER_DELETE_FINISHED';

  static deleteMember(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_DELETE,
        MemberEffect.requestDeleteMember,
        id
      );
    };
  }

  static REQUEST_MEMBER_CREATE = 'MemberAction.REQUEST_MEMBER_CREATE';
  static REQUEST_MEMBER_CREATE_FINISHED = 'MemberAction.REQUEST_MEMBER_CREATE_FINISHED';

  static createMember(person) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_CREATE,
        MemberEffect.requestCreateMember,
        person
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado un miembro', ToastStatusEnum.Success));
      }
    };
  }
}
