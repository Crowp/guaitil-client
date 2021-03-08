import React, { useState, useEffect } from 'react';
import { ActivityContext } from '../context';
import ActivityModel from '../../models/ActivityModel';
import AddressModel from '../../models/AddressModel';
import ActivityDescription from '../../models/ActivityDescription';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocalsState } from '../hooks';
import ActivityAction from '../../stores/activity/ActivityAction';

const { Provider } = ActivityContext;
const ActivityProvider = ({ children, defaultItem }) => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState(
    defaultItem || {
      ...new ActivityModel(),
      activityDescription: {
        ...new ActivityDescription(),
        address: new AddressModel(),
        activityDate: new moment()
      },
      localsDescriptions: []
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

  const handleActivityDescriptionChange = ({ value, name }) =>
    handleInputChangeActivity({
      name: 'activityDescription',
      value: { ...activity.activityDescription, [name]: value }
    });

  const handleLocalsChange = values => {
    console.log(values);
    const options = values ? values : [];
    const localsIds = [...options.map(item => item.value)];
    setLocalsIdSelected(localsIds);
    const localsSelected = locals.filter(local => {
      return localsIds.includes(local.id);
    });
    console.log(localsSelected);

    handleInputChangeActivity({
      name: 'localsDescriptions',
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
    handleActivityUpdate,
    handleActivityDescriptionChange
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ActivityProvider;
