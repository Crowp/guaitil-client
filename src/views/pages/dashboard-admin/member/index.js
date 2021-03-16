import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import MemberTable from './MemberTable';
import { selectMembers } from '../../../../selectors/members/MemberSelectors';
import { useMembersEffect } from '../../../hooks';
import Loader from '@/template/components/common/Loader';
import { isIterableArray } from '@/template/helpers/utils';
import { RouteMap } from '../../../../constants';

const MemberManagement = () => {
  const history = useHistory();

  const { isRequesting, items: members } = useMembersEffect(selectMembers);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(members) ? (
    <MemberTable items={members} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Member.create())}
      actionName="Registra un miembro"
      title="Administración de miembros"
      description="No hay miembros registradas aún!"
    />
  );
};

export default React.memo(MemberManagement);
