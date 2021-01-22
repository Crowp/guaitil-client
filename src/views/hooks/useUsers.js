import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAction from '../../stores/user/UserAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';

const useUsers = (selector = state => state.users) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([UserAction.REQUEST_USER]);
  const items = useSelector(state => selector(state));
  const hasErrors = useHasErrors([UserAction.REQUEST_USER_FINISHED]);
  useEffect(() => {
    dispatch(UserAction.getUsers());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useUsers;
