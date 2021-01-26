import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocalContext, UserContext } from '../context';
import LocalModel from '../../models/LocalModel';
import AddressModel from '../../models/AddressModel';
import LocalAction from '../../stores/local/LocalAction';

const { Provider } = LocalContext;
const LocalProvider = ({ children, defaultItem }) => {
  const { user } = useContext(UserContext);

  const [local, setLocal] = useState(
    defaultItem || {
      ...new LocalModel(),
      address: new AddressModel(),
      member: {
        id: 0
      }
    }
  );

  const [hasUser, setHasUser] = useState(false);

  const dispatch = useDispatch();

  const members = useSelector(state => state.members);

  useEffect(() => {
    if (defaultItem) {
      setLocal(defaultItem);
    }
  }, [defaultItem]);

  const handleInputLocalChange = ({ value, name }) => setLocal({ ...local, [name]: value });

  const handleMemberChange = ({ value, name }) => {
    const [memberSelected] = members.filter(x => x.id === value);
    handleInputLocalChange({
      name: name,
      value: memberSelected || { id: 0 }
    });
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
    local,
    setLocal,
    handleInputLocalChange,
    handleMemberChange,
    handleLocalCreate,
    handleLocalUpdate,
    setHasUser,
    hasUser
  };

  return <Provider value={value}>{children}</Provider>;
};

export default LocalProvider;
