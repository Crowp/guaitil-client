import React, { useState, useEffect } from 'react';
import { UserContext } from '../context';

const { Provider } = UserContext;
const UserProvider = ({ children, defaultUser }) => {
  const [user, setUser] = useState(defaultUser || { email: '', password: '', roles: [] });

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
