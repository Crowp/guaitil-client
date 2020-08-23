import React, { useState, useEffect } from 'react';
import { MemberContext } from '../context';

const { Provider } = MemberContext;
const MembersProvider = ({ children, defaultMember }) => {
  const [member, setMember] = useState(defaultMember);

  useEffect(() => {
    if (defaultMember) {
      setMember(defaultMember);
    }
  }, [defaultMember]);

  const handleInputChangeMember = ({ value, name }) => setMember({ ...member, [name]: value });

  const value = { member, setMember, handleInputChangeMember };

  return <Provider value={value}>{children}</Provider>;
};

export default MembersProvider;
