import React, { useState } from 'react';
import { PersonContext, LocalContext } from '../context';

const PersonProvider = ({ children }) => {
  const [person, setPerson] = useState({});
  const [local, setLocal] = useState({ address: {} });

  const handleInputChangePerson = ({ value, name }) => setPerson({ ...person, [name]: value });
  const handleInputChangeLocal = ({ value, name }) => setLocal({ ...local, [name]: value });

  const valuePerson = { person, setPerson, handleInputChangePerson };
  const valueLocal = { local, setLocal, handleInputChangeLocal };

  return (
    <PersonContext.Provider value={valuePerson}>
      <LocalContext.Provider value={valueLocal}>{children}</LocalContext.Provider>
    </PersonContext.Provider>
  );
};

export default PersonProvider;
