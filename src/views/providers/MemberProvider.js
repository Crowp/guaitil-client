import React, { useState, useEffect } from 'react';
import { MemberContext } from '../context';
import MemberModel from '../../models/MemberModel';
import moment from 'moment';
import PersonModel from '../../models/PersonModel';

const { Provider } = MemberContext;
const MemberProvider = ({ children, defaultMember }) => {
  const [member, setMember] = useState(
    defaultMember || {
      ...new MemberModel(),
      createdAt: new moment(),
      person: new PersonModel()
    }
  );

  useEffect(() => {
    if (defaultMember) {
      setMember(defaultMember);
    }
  }, [defaultMember]);

  const handleInputChangeMember = ({ value, name }) => setMember({ ...member, [name]: value });
  const value = { member, setMember, handleInputChangeMember };

  return <Provider value={value}>{children}</Provider>;
};

export default MemberProvider;
