import React, { useState, useEffect } from 'react';
import { ActivityContext } from '../context';
import ActivityModel from '../../models/ActivityModel';
import AddressModel from '../../models/AddressModel';
import VirtualAddressModel from '../../models/VirtualAddressModel';
import moment from 'moment';

const { Provider } = ActivityContext;
const ActivityProvider = ({ children, defaultActivity }) => {
  const [activity, setActivity] = useState(
    defaultActivity || {
      ...new ActivityModel(),
      activityDate: new moment(),
      address: {
        ...new AddressModel(),
        virtualAddress: new VirtualAddressModel()
      }
    }
  );

  useEffect(() => {
    if (defaultActivity) {
      setActivity(defaultActivity);
    }
  }, [defaultActivity]);

  const handleInputChangeActivity = ({ value, name }) => setActivity({ ...activity, [name]: value });
  const value = { activity, setActivity, handleInputChangeActivity };

  return <Provider value={value}>{children}</Provider>;
};

export default ActivityProvider;
