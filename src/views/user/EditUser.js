import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormSteps from './components/edit/FormSteps';
import Section from '../components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../template/helpers/utils';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import UserProvider from '../providers/UserProvider';
import LocalAction from '../../stores/local/LocalAction';
import UserAction from '../../stores/user/UserAction';
import { hasErrors } from '../../selectors/error/ErrorSelector';
import ErrorAction from '../../stores/error/ErrorAction';
import { useHistory } from 'react-router-dom';

const EditLocal = ({
  match: {
    params: { id }
  }
}) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector(state => state.users);

  const isRequesting = useSelector(state => selectRequesting(state, [UserAction.R]));

  const exitsErrors = useSelector(state =>
    hasErrors(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED, UserAction.REQUEST_USER_FINISHED])
  );

  const isEmptyObject = !Object.keys(user).length;

  console.log(user);

  useEffect(() => {
    if (isIterableArray(users)) {
      const [userEdit] = users.filter(user => user.id === Number(id));
      setUser(userEdit);
    } else {
      dispatch(UserAction.getUserById(id));
    }
  }, [users, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/users');
      dispatch(ErrorAction.clearAll());
    }
  }, [isRequesting, exitsErrors, dispatch, history, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <UserProvider defaultUser={user}>
            <FormSteps />
          </UserProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditLocal;