import React, { useState, useEffect } from 'react';
import { LocalContext } from '../context';
import LocalModel from '../../models/LocalModel';
import AddressModel from '../../models/AddressModel';
import VirtualAddressModel from '../../models/VirtualAddressModel';

const { Provider } = LocalContext;
const LocalProvider = ({ children, defaultLocal }) => {
  const [local, setLocal] = useState(
    defaultLocal || {
      ...new LocalModel(),
      address: {
        ...new AddressModel(),
        virtualAddress: new VirtualAddressModel()
      }
    }
  );

  useEffect(() => {
    if (defaultLocal) {
      setLocal(defaultLocal);
    }
  }, [defaultLocal]);

  const handleInputChangeLocal = ({ value, name }) => setLocal({ ...local, [name]: value });

  const value = { local, setLocal, handleInputChangeLocal };

  return <Provider value={value}>{children}</Provider>;
};

export default LocalProvider;
