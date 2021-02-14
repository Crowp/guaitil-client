import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ActivityAction from '../../stores/activity/ActivityAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useActivitiesState from './useActivitiesState';

const useActivityByIdEffect = id => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState({});
  const [load, setLoad] = useState(false);
  const activities = useActivitiesState();

  const isRequesting = useIsRequesting([ActivityAction.REQUEST_ACTIVITY_BY_ID]);
  const hasErrors = useHasErrors([ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(activities) && id) {
      const [activityFounded = {}] = activities.filter(item => item.id === Number(id));
      if (activityFounded) {
        setActivity(activityFounded);
      }
    } else if (!load && id) {
      dispatch(ActivityAction.getActivityById(id));
      setLoad(true);
    }
  }, [dispatch, id, activities, load]);

  return { isRequesting, activity, hasErrors, activities };
};

export default useActivityByIdEffect;
