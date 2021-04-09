import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { MemberContext } from '../context';
import { MemberEnum } from '../../constants';
import MemberAction from '../../stores/member/MemberAction';
import MemberModel from '../../models/MemberModel';
import PersonModel from '../../models/PersonModel';
import { localToCreateObject } from './LocalProvider';
import { userToCreateObject } from './UserProvider';

export const memberToCreateObject = {
  ...new MemberModel(),
  affiliationDate: new moment(),
  person: new PersonModel(),
  memberType: MemberEnum.Regular
};

const memberStateToCreate = {
  local: localToCreateObject,
  user: userToCreateObject,
  member: memberToCreateObject
};

const MemberProvider = ({ children, defaultItem }) => {
  const [stateForm, setStateForm] = useState(defaultItem || memberStateToCreate);
  const [hasLocal, setHasLocal] = useState(true);

  const dispatch = useDispatch();

  const { member, local, user } = stateForm;

  useEffect(() => {
    if (defaultItem) {
      setStateForm(defaultItem);
    }
  }, [defaultItem]);

  const handleStateFormChange = (name, value) => setStateForm({ ...stateForm, [name]: value });

  const handleLocalChange = ({ value, name }) => handleStateFormChange('local', { ...local, [name]: value });

  const handleLocalDescriptionChange = ({ value, name }) => {
    handleLocalChange({ name: 'localDescription', value: { ...local.localDescription, [name]: value } });
  };
  const handleUserChange = ({ value, name }) => handleStateFormChange('user', { ...user, [name]: value });

  const handleMemberChange = ({ value, name }) => {
    handleStateFormChange('member', { ...member, [name]: value });
  };

  const handleMemberCreate = () => {
    const memberToStore = {
      ...member,
      affiliationDate: moment(member.affiliationDate).format('YYYY-MM-DD HH:mm')
    };
    if (hasLocal) {
      const password =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      const newUser = { ...user, password };
      dispatch(MemberAction.createMemberWithUserWithLocal(memberToStore, newUser, local));
    } else {
      dispatch(MemberAction.createMember(memberToStore));
    }
  };

  const handleMemberUpdate = () => {
    const memberToStore = {
      ...member,
      affiliationDate: moment(member.affiliationDate).format('YYYY-MM-DD HH:mm')
    };
    dispatch(MemberAction.updateMember(memberToStore));
  };

  const value = {
    user,
    member,
    local,
    hasLocal,
    setHasLocal,
    handleLocalChange,
    handleMemberChange,
    handleUserChange,
    handleMemberCreate,
    handleMemberUpdate,
    handleLocalDescriptionChange
  };

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
};

export default MemberProvider;

MemberProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultItem: PropTypes.any
};
