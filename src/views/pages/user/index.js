import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../components/extra/Starter';
import { isIterableArray } from '../../../template/helpers/utils';
import UserTable from './UserTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers } from '../../../selectors/user/UserSelector';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import UserAction from '../../../stores/user/UserAction';
import { Col, Row } from 'reactstrap';

const UserManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector(selectUsers);
  const isRequesting = useSelector(state => selectRequesting(state, [UserAction.REQUEST_USER]));

  useEffect(() => {
    dispatch(UserAction.getUsers());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(users) ? (
    <UserTable users={users} />
  ) : (
    <Starter
      action={() => history.push('/admin/user/create')}
      actionName="Registra un usuario"
      title="Administración de usuarios"
      description="No hay usuarios aún!"
    />
  );
};

export default React.memo(UserManagement);
