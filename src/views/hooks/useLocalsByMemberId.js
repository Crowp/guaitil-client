import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalsState from './useLocalsState';

const useLocalsByMemberId = (selector = state => state.locals, memberId) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL_BY_MEMBER_ID]);
  const items = useLocalsState(selector);
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_BY_MEMBER_ID_FINISHED]);
  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(memberId));
  }, [dispatch, memberId]);
  return { isRequesting, items, hasErrors };
};

export default useLocalsByMemberId;
