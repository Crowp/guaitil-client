import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../components/extra/Starter';
import { isIterableArray } from '../../../template/helpers/utils';
import LocalTable from './LocalTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectLocals } from '../../../selectors/locals/LocalsSelector';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import LocalAction from '../../../stores/local/LocalAction';
import { Col, Row } from 'reactstrap';

const LocalManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const locals = useSelector(selectLocals);
  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_LOCAL]));

  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(locals) ? (
    <LocalTable locals={locals} />
  ) : (
    <Starter
      action={() => history.push('/locals/create')}
      actionName="Registra un local"
      title="Administración de locales"
      description="No hay locales aún!"
    />
  );
};

export default LocalManagement;
