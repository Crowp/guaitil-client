import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { UserContext } from '../context';
import { useMembersState } from '../hooks';
import { RoleEnum } from '../../constants';
import UserAction from '../../stores/user/UserAction';

export const userToCreateObject = { password: '', roles: [RoleEnum.Associated], member: {} };

const { Provider } = UserContext;
const UserProvider = ({ children, defaultItem }) => {
  const [user, setUser] = useState(defaultItem || { password: '', roles: [RoleEnum.Associated], member: {} });

  useEffect(() => {
    if (defaultItem) {
      setUser(defaultItem);
    }
  }, [defaultItem]);

  console.log(defaultItem);

  const dispatch = useDispatch();

  const members = useMembersState();

  const handleInputUserChange = ({ value, name }) => setUser({ ...user, [name]: value });

  const handleMemberChange = ({ value, name }) => {
    const [memberSelected] = members.filter(x => x.id === value);
    handleInputUserChange({
      name: name,
      value: memberSelected || { id: 0 }
    });
  };

  const handleUserCreate = () => {
    const newUser = { ...user, roles: [...user.roles, RoleEnum.Admin] };
    dispatch(UserAction.createUser(newUser));
  };

  const handleUserUpdate = () => {
    dispatch(UserAction.updateUserPassword(user.id, user.password));
  };

  const value = {
    user,
    setUser,
    handleInputUserChange,
    handleMemberChange,
    handleUserCreate,
    handleUserUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default UserProvider;
