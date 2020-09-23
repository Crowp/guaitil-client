import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner, Col, Row } from 'reactstrap';

import { selectAuthMemberId } from '../../../../selectors/auth/AuthSelector';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import LocalAction from '../../../../stores/local/LocalAction';
import LocalItem from '../../../components/locals/LocalItem';

const LocalsComponent = props => {
  const dispatch = useDispatch();
  const idMember = useSelector(selectAuthMemberId);

  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_LOCAL_BY_MEMBER_ID]));
  const locals = useSelector(state => state.locals);

  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(idMember));
  }, [dispatch, idMember]);
  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    locals.map((local, index) => <LocalItem local={local} key={`local-${local.id}-${index}`} />)
  );
};

export default LocalsComponent;
