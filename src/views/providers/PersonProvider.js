import React, { useState } from 'react';
import { PersonContext, LocalContext } from '../context';

const PersonProvider = ({ children }) => {
  const [person, setPerson] = useState({});
  const [local, setLocal] = useState({ address: {} });

  const handleInputChangePerson = ({ value, name }) => setPerson({ ...person, [name]: value });
  const handleInputChangeLocal = ({ value, name }) => setLocal({ ...local, [name]: value });

  const value = { person, local, setPerson, step, setStep, handleInputChangePerson, handleInputChangeLocal };
  console.log();
  return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>;
};

export default PersonProvider;
