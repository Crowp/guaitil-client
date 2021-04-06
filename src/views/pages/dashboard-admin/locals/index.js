import React from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@/template/components/common/Loader';
import { isIterableArray } from '@/template/helpers/utils';
import { selectLocals } from '../../../../selectors/locals/LocalsSelector';
import { useLocalsEffect } from '../../../hooks';
import LocalTable from './LocalTable';
import Starter from '../../../components/extra/Starter';
import { RouteMap } from '../../../../constants';

const LocalManagement = () => {
  const history = useHistory();

  const { isRequesting, items } = useLocalsEffect(selectLocals);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(items) ? (
    <LocalTable items={items} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Local.create())}
      actionName="Registrar un local"
      title="Administración de locales"
      description="Aún no hay locales registrados!"
    />
  );
};

export default React.memo(LocalManagement);
