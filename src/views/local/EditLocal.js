import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormEditSteps from './components/edit/FormEditSteps';
import Section from '../components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../template/helpers/utils';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import LocalProvider from '../providers/LocalProvider';
import LocalAction from '../../stores/local/LocalAction';
import { hasErrors, selectRawErrors } from '../../selectors/error/ErrorSelector';
import ErrorAction from '../../stores/error/ErrorAction';
import { useHistory } from 'react-router-dom';

const EditLocal = ({
  match: {
    params: { id }
  }
}) => {
  const [local, setLocal] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { locals } = useSelector(state => state);

  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(local).length;

  useEffect(() => {
    if (isIterableArray(locals)) {
      const [localEdit] = locals.filter(lcal => lcal.id === Number(id));
      setLocal(localEdit);
    } else {
      dispatch(LocalAction.getLocalById(id));
    }
  }, [locals, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/locals');
      dispatch(ErrorAction.removeById(errors[LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history]);

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
          <LocalProvider defaultLocal={local}>
            <FormEditSteps />
          </LocalProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditLocal;
