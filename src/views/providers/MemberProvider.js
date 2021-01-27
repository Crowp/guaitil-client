import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { MemberContext, UserContext, LocalContext } from '../context';
import { MemberEnum } from '../../constants';
import MemberAction from '../../stores/member/MemberAction';
import MemberModel from '../../models/MemberModel';
import PersonModel from '../../models/PersonModel';

const { Provider } = MemberContext;
const MemberProvider = ({ children, defaultItem }) => {
  const [member, setMember] = useState(
    defaultItem || {
      ...new MemberModel(),
      createdAt: new moment(),
      person: new PersonModel(),
      memberType: MemberEnum.Regular
    }
  );
  const { user } = useContext(UserContext);
  const { local } = useContext(LocalContext);
  const [hasLocal, setHasLocal] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setMember(defaultItem);
    }
  }, [defaultItem]);

  const handleInputMemberChange = ({ value, name }) => setMember({ ...member, [name]: value });

  const handleMemberCreate = () => {
    console.log({ member, user, local });
    if (hasLocal) {
      dispatch(MemberAction.createMemberWithUserWithLocal(member, user, local));
    } else {
      dispatch(MemberAction.createMember(member));
    }
  };

  const handleMemberUpdate = () => {
    console.log(member);
    dispatch(MemberAction.updateMember(member));
  };

  const value = {
    member,
    setMember,
    hasLocal,
    setHasLocal,
    handleInputMemberChange,
    handleMemberCreate,
    handleMemberUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default MemberProvider;
