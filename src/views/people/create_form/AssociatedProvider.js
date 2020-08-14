import React, { useState } from 'react';
import { AssociatedContext } from '../../context';

const AssociatedProvider = ({ children }) => {
  const [associated, setAssociated] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = ({ value, name }) => setAssociated({ ...associated, [name]: value });

  const value = { associated, setAssociated, step, setStep, handleInputChange };
  return <AssociatedContext.Provider value={value}>{children}</AssociatedContext.Provider>;
};

export default AssociatedProvider;
