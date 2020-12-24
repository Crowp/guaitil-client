import React, { useState, useEffect } from 'react';
import { UserContext } from '../context';
import { RoleEnum } from '../../constants';

const { Provider } = UserContext;
const UserProvider = ({ children, defaultUser }) => {
  const [user, setUser] = useState(defaultUser || { password: '', roles: [RoleEnum.Associated] });

  useEffect(() => {
    if (defaultUser) {
      setUser(defaultUser);
    }
  }, [defaultUser]);

  const handleInputChangeUser = ({ value, name }) => setUser({ ...user, [name]: value });

  const value = { user, setUser, handleInputChangeUser };

  return <Provider value={value}>{children}</Provider>;
};

export default UserProvider;
