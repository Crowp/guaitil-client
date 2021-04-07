import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActivityAction from '../../stores/activity/ActivityAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useActivitiesState from './useActivitiesState';

const useActivitiesActiveEffect = (selector = state => state.activities) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ActivityAction.REQUEST_ACTIVITY_ACTIVE]);
  const items = useActivitiesState(selector);
  const hasErrors = useHasErrors([ActivityAction.REQUEST_ACTIVITY_ACTIVE_FINISHED]);
  useEffect(() => {
    dispatch(ActivityAction.getActivitiesActive());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useActivitiesActiveEffect;
