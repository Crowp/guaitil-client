import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../components/extra/Starter';
import { isIterableArray } from '../../template/helpers/utils';
import MemberTable from './MemberTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectMembers } from '../../selectors/members/MemberSelectors';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import MemberAction from '../../stores/member/MemberAction';
import { Col, Row } from 'reactstrap';

const MemberManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const members = useSelector(selectMembers);
  const isRequesting = useSelector(state => selectRequesting(state, [MemberAction.REQUEST_MEMBER]));

  useEffect(() => {
    dispatch(MemberAction.getMembers());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(members) ? (
    <MemberTable members={members} />
  ) : (
    <Starter
      action={() => history.push('people/create')}
      actionName="Registra una Persona"
      title="Administración de Personas"
      description="No hay personas registradas aún!"
    />
  );
};

export default MemberManagement;
