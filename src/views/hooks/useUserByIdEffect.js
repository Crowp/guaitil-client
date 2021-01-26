import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import UserAction from '../../stores/user/UserAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useUsersState from './useUsersState';

const useUserByIdEffect = id => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const users = useUsersState();

  const isRequesting = useIsRequesting([UserAction.REQUEST_USER_BY_MEMBER_ID]);
  const hasErrors = useHasErrors([UserAction.REQUEST_USER_BY_MEMBER_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(users)) {
      const [userFounded = false] = users.filter(item => item.id === id);
      if (userFounded) {
        setUser(userFounded);
      }
    } else if (!load) {
      dispatch(UserAction.getUserById(id));
      setLoad(true);
    }
  }, [dispatch, id, users, load]);

  return { isRequesting, user, hasErrors, users };
};

export default useUserByIdEffect;