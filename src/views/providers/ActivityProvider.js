import React, { useState, useEffect } from 'react';
import { ActivityContext } from '../context';
import ActivityModel from '../../models/ActivityModel';
import AddressModel from '../../models/AddressModel';
import { useDispatch } from 'react-redux';
import VirtualAddressModel from '../../models/VirtualAddressModel';
import moment from 'moment';
import { useLocalsState } from '../hooks';
import ActivityAction from '../../stores/activity/ActivityAction';

const { Provider } = ActivityContext;
const ActivityProvider = ({ children, defaultItem }) => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState(
    defaultItem || {
      ...new ActivityModel(),
      activityDate: new moment(),
      address: {
        ...new AddressModel(),
        virtualAddress: new VirtualAddressModel()
      },
      locals: []
    }
  );
  useEffect(() => {
    if (defaultItem) {
      setActivity(defaultItem);
    }
  }, [defaultItem]);

  const locals = useLocalsState(state => state.locals);

  const [localsIdSelected, setLocalsIdSelected] = useState(activity.locals?.map(local => local.id) || []);

  const handleInputChangeActivity = ({ value, name }) => setActivity({ ...activity, [name]: value });

  const handleLocalsChange = values => {
    console.log(values);
    const options = values ? values : [];
    const localsIds = [...options.map(item => item.value)];
    setLocalsIdSelected(localsIds);
    const localsSelected = locals.filter(local => localsIds.includes(local.id));
    handleInputChangeActivity({
      name: 'locals',
      value: localsSelected
    });
  };

  const handleActivityCreate = () => {
    dispatch(ActivityAction.createActivity(activity));
  };
  const handleActivityUpdate = () => {
    dispatch(ActivityAction.updateActivity(activity));
  };
  const value = {
    activity,
    setActivity,
    handleInputChangeActivity,
    handleLocalsChange,
    localsIdSelected,
    handleActivityCreate,
    handleActivityUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ActivityProvider;
