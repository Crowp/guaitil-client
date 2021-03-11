import React, { useState, useEffect } from 'react';
import { ActivityContext } from '../context';
import ActivityModel from '../../models/ActivityModel';
import AddressModel from '../../models/AddressModel';
import ActivityDescription from '../../models/ActivityDescription';
import { useDispatch } from 'react-redux';
import { useLocalsState } from '../hooks';
import ActivityAction from '../../stores/activity/ActivityAction';
import moment from 'moment';

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

  const [localDescriptionIdSelected, setLocalDescriptionIdSelected] = useState(
    activity.locals?.map(local => local.localDescription.id) || []
  );

  const handleInputChangeActivity = ({ value, name }) => setActivity({ ...activity, [name]: value });

  const handleActivityDescriptionChange = ({ value, name }) =>
    handleInputChangeActivity({
      name: 'activityDescription',
      value: { ...activity.activityDescription, [name]: value }
    });

  const handleLocalsChange = values => {
    const options = values ? values : [];
    const localsDescriptionIds = [...options.map(item => item.value)];
    setLocalDescriptionIdSelected(localsDescriptionIds);
    const localsDescriptionsSelected = locals
      .filter(local => {
        const { localDescription } = local;
        return localsDescriptionIds.includes(localDescription.id);
      })
      .map(local => local.localDescription);

    handleInputChangeActivity({
      name: 'localsDescriptions',
      value: localsDescriptionsSelected
    });
  };

  const handleActivityCreate = () => {
    // const Store = {
    //   ...member,
    //   affiliationDate: moment(member.affiliationDate).format('YYYY-MM-DD HH:mm')
    // };
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
    localDescriptionIdSelected,
    handleActivityCreate,
    handleActivityUpdate,
    handleActivityDescriptionChange
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ActivityProvider;
