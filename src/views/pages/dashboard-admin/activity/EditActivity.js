import React from 'react';
import { useSalesEffect } from '../../../hooks';
import useActivityByIdEffect from '../../../hooks/useActivityByIdEffect';
import FormActivityContainer from './components/FormActivityContainer';
import { useErrorRedirect } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useParams } from 'react-router';

const EditActivity = () => {
  const { id } = useParams();
  const { isRequesting } = useSalesEffect();
  const { isRequesting: isActivitiesRequesting, activity, hasErrors } = useActivityByIdEffect(id);

  const validatetionError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.Home.root(), validatetionError);
  const isEmptyObject = !Object.keys(activity).length;
  return (
    <FormActivityContainer defaultItem={activity} isLoading={isActivitiesRequesting || isRequesting || isEmptyObject} />
  );
};

export default React.memo(EditActivity);
