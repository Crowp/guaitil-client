import React, { useState } from 'react';
import { LocalContext } from '../context';

const { Provider } = LocalContext;
const LocalProvider = ({ children }) => {
  const [local, setLocal] = useState({ address: {} });

  const handleInputChangeLocal = ({ value, name }) => setLocal({ ...local, [name]: value });

  const value = { local, setLocal, handleInputChangeLocal };

  return <Provider value={value}>{children}</Provider>;
};

export default LocalProvider;
