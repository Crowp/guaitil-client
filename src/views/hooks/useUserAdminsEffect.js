import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserAction from '../../stores/user/UserAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useUsersState from './useUsersState';

const useUserAdminsEffect = (selector = state => state.users) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([UserAction.REQUEST_USER_ADMINS]);
  const items = useUsersState(selector);
  const hasErrors = useHasErrors([UserAction.REQUEST_USER_ADMINS_FINISHED]);
  useEffect(() => {
    dispatch(UserAction.getUsersAdmin());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useUserAdminsEffect;
