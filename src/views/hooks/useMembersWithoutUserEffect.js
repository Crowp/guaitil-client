import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MemberAction from '../../stores/member/MemberAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useMembersState from './useMembersState';

const useMembersWithoutUserEffect = (selector = state => state.members) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([MemberAction.REQUEST_MEMBER_WITHOUT_USER]);
  const items = useMembersState(selector);
  const hasErrors = useHasErrors([MemberAction.REQUEST_MEMBER_WITHOUT_USER_FINISHED]);
  useEffect(() => {
    dispatch(MemberAction.getMembersWithoutUser());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useMembersWithoutUserEffect;
