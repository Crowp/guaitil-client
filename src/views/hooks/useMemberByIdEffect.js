import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import MemberAction from '../../stores/member/MemberAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useMembersState from './useMembersState';

const useMemberByIdEffect = id => {
  const dispatch = useDispatch();
  const [member, setMember] = useState({});
  const [load, setLoad] = useState(false);
  const members = useMembersState();

  const isRequesting = useIsRequesting([MemberAction.REQUEST_MEMBER_BY_ID]);
  const hasErrors = useHasErrors([MemberAction.REQUEST_MEMBER_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(members)) {
      const [memberFounded = false] = members.filter(item => item.memberId === Number(id));
      if (memberFounded) {
        setMember(memberFounded);
      }
    } else if (!load) {
      dispatch(MemberAction.getMemberById(id));
      setLoad(true);
    }
  }, [dispatch, id, members, load]);

  return { isRequesting, member, hasErrors, members };
};

export default useMemberByIdEffect;
