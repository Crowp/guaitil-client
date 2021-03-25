import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useLocalsState } from '../hooks';
import AddressModel from '../../models/AddressModel';
import { ActivityContext } from '../context';
import ActivityModel from '../../models/ActivityModel';
import ActivityAction from '../../stores/activity/ActivityAction';
import ActivityDescription from '../../models/ActivityDescription';

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
    activity.localsDescriptions.map(local => local.id) || []
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
    const activityStore = {
      ...activity,
      activityDescription: {
        ...activity.activityDescription,
        activityDate: moment(activity.activityDescription.activityDate).format('YYYY-MM-DD HH:mm')
      }
    };
    dispatch(ActivityAction.createActivity(activityStore));
  };
  const handleActivityUpdate = () => {
    const activityStore = {
      ...activity,
      activityDescription: {
        ...activity.activityDescription,
        activityDate: moment(activity.activityDescription.activityDate).format('YYYY-MM-DD HH:mm')
      }
    };
    dispatch(ActivityAction.updateActivity(activityStore));
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
ActivityProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultItem: PropTypes.any
};
