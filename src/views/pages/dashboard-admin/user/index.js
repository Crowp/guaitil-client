import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import UserTable from './UserTable';
import { selectUsers } from '../../../../selectors/user/UserSelector';

import Loader from '@/template/components/common/Loader';
import { useUserAdminsEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const UserManagement = () => {
  const history = useHistory();

  const { isRequesting, items } = useUserAdminsEffect(selectUsers);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(items) ? (
    <UserTable items={items} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.User.create())}
      actionName="Registrar un usuario"
      title="Administración de usuarios"
      description="Aún no hay usuarios registrados!"
    />
  );
};

export default React.memo(UserManagement);
