import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberAction from '../../stores/member/MemberAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';

const useMembers = (selector = state => state.members) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([MemberAction.REQUEST_MEMBER]);
  const items = useSelector(state => selector(state));
  const hasErrors = useHasErrors([MemberAction.REQUEST_MEMBER_FINISHED]);
  useEffect(() => {
    dispatch(MemberAction.getMembers());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useMembers;
