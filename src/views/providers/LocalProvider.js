import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { LocalContext } from '../context';
import { useMembersState } from '../hooks';
import LocalModel from '../../models/LocalModel';
import AddressModel from '../../models/AddressModel';
import LocalAction from '../../stores/local/LocalAction';

import { userToCreateObject } from './UserProvider';

export const localToCreateObject = {
  ...new LocalModel(),
  address: new AddressModel(),
  member: {
    memberId: 0
  }
};

const localStateToCreate = {
  local: localToCreateObject,
  user: userToCreateObject
};

const { Provider } = LocalContext;
const LocalProvider = ({ children, defaultItem }) => {
  const [stateForm, setStateForm] = useState(defaultItem || localStateToCreate);

  const [hasUser, setHasUser] = useState(false);

  const dispatch = useDispatch();

  const members = useMembersState();

  const { local, user } = stateForm;

  useEffect(() => {
    if (defaultItem) {
      setStateForm(defaultItem);
    }
  }, [defaultItem]);

  const handleStateFormChange = (name, value) => setStateForm({ ...stateForm, [name]: value });

  const handleLocalChange = ({ value, name }) => handleStateFormChange('local', { ...local, [name]: value });

  const handleUserChange = ({ value, name }) => handleStateFormChange('user', { ...user, [name]: value });

  const handleMemberChange = ({ value, name }) => {
    const [memberSelected] = members.filter(x => x.memberId === value);
    handleLocalChange({ name, value: memberSelected || { id: 0 } });
  };

  const handleLocalCreate = () => {
    if (!hasUser) {
      dispatch(LocalAction.createLocalWithUser(local, user));
    } else {
      dispatch(LocalAction.createLocal(local));
    }
  };

  const handleLocalUpdate = () => {
    dispatch(LocalAction.updateLocal(local, user));
  };

  const value = {
    local: stateForm.local,
    user: stateForm.user,
    handleLocalChange,
    handleUserChange,
    handleMemberChange,
    handleLocalCreate,
    handleLocalUpdate,
    setHasUser,
    hasUser
  };

  return <Provider value={value}>{children}</Provider>;
};

export default LocalProvider;
