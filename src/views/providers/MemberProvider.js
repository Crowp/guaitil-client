import React, { useState } from 'react';
import { MemberContext, LocalContext } from '../context';
import { useDispatch } from 'react-redux';
import MemberAction from '../../stores/member/MemberAction';

const PersonProvider = ({ children }) => {
  const [member, setMember] = useState({});
  const [local, setLocal] = useState({ address: {} });
  const dispatch = useDispatch();

  const onSubmitOnlyMember = ({ occupation, createdAt, memberType, ...person }) => {
    const memberApi = {
      occupation,
      createdAt,
      memberType,
      person: { ...person, personType: 'ROLE_MEMBER' },
      locals: []
    };
    dispatch(MemberAction.createMember(memberApi));
  };

  const onSubmitMemberWithLocal = () => {};

  const handleInputChangeMember = ({ value, name }) => setMember({ ...member, [name]: value });
  const handleInputChangeLocal = ({ value, name }) => setLocal({ ...local, [name]: value });

  const ValueMember = { member, setMember, handleInputChangeMember, onSubmitOnlyMember };
  const valueLocal = { local, setLocal, handleInputChangeLocal, onSubmitMemberWithLocal };

  return (
    <MemberContext.Provider value={ValueMember}>
      <LocalContext.Provider value={valueLocal}>{children}</LocalContext.Provider>
    </MemberContext.Provider>
  );
};

export default PersonProvider;
