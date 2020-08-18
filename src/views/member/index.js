import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../components/extra/Starter';
import { isIterableArray } from '../helpers/utils';
import MemberTable from './MemberTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectMembers } from '../../selectors/members/MemberSelectors';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import MemberAction from '../../stores/member/MemberAction';

const MemberManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const members = useSelector(selectMembers);
  const isRequesting = useSelector(state => selectRequesting(state, [MemberAction.REQUEST_MEMBER]));

  useEffect(() => {
    dispatch(MemberAction.getMembers());
  }, [dispatch]);

  return (
    !isRequesting &&
    isIterableArray(members) &&
    (isIterableArray(members) ? (
      <MemberTable members={members} />
    ) : (
      <Starter
        action={() => history.push('people/create')}
        actionName="Registra una Persona"
        title="Administración de Personas"
        description="No hay personas registradas aún!"
      />
    ))
  );
};

export default MemberManagement;
