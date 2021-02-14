import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import ActivityTable from './ActivityTable';
import { selectAllActivities } from '../../../../selectors/activity/ActivitySelector';
import Loader from '@/template/components/common/Loader';
import useActivitiesEffect from '../../../hooks/useActivitiesEffect';
import { RouteMap } from '../../../../constants';

const AllManagement = () => {
  const history = useHistory();
  const { isRequesting, items: activities } = useActivitiesEffect(selectAllActivities);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(activities) ? (
    <ActivityTable activities={activities} title="Actividades" all />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Activity.create())}
      actionName="Registra una Actividad"
      title="Administración de actividades"
      description="No hay actividades aún!"
    />
  );
};

export default React.memo(AllManagement);
