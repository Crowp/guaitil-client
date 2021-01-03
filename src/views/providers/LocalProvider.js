import React, { useState, useEffect } from 'react';
import { LocalContext } from '../context';
import LocalModel from '../../models/LocalModel';
import AddressModel from '../../models/AddressModel';
import { useSelector } from 'react-redux';

const { Provider } = LocalContext;
const LocalProvider = ({ children, defaultLocal }) => {
  const [local, setLocal] = useState(
    defaultLocal || {
      ...new LocalModel(),
      address: new AddressModel(),
      member: {
        id: 0
      }
    }
  );
  const members = useSelector(state => state.members);

  useEffect(() => {
    if (defaultLocal) {
      setLocal(defaultLocal);
    }
  }, [defaultLocal]);

  const handleInputLocalChange = ({ value, name }) => setLocal({ ...local, [name]: value });

  const handleMemberChange = ({ value, name }) => {
    const [memberSelected] = members.filter(x => x.id === value);
    handleInputLocalChange({
      name: name,
      value: memberSelected || { id: 0 }
    });
  };

  const value = { local, setLocal, handleInputLocalChange, handleMemberChange };

  return <Provider value={value}>{children}</Provider>;
};

export default LocalProvider;
