import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import FormSteps from './component/create/FormSteps';
import Section from '@/template/components/common/Section';
import ProductProvider from '../../../providers/ProductProvider';
import { selectAuthMemberId } from '../../../../selectors/auth/AuthSelector';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { useSelector, useDispatch } from 'react-redux';
import LocalAction from '../../../../stores/local/LocalAction';
import { hasErrors } from '../../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import { isIterableArray } from '@/template/helpers/utils';

const CreateProduct = ({
  match: {
    params: { idLocal }
  }
}) => {
  const dispatch = useDispatch();

  const idMember = useSelector(selectAuthMemberId);

  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(idMember));
  }, [dispatch, idMember]);

  const [local, setLocal] = useState({});
  const history = useHistory();
  const { locals } = useSelector(state => state);

  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [LocalAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(local).length;

  useEffect(() => {
    if (isIterableArray(locals)) {
      const [localElected] = locals.filter(lcal => lcal.id === Number(idLocal));
      setLocal(localElected);
    } else {
      dispatch(LocalAction.getLocalsByMemberId(idMember));
    }
  }, [locals, idMember, dispatch, idLocal]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/member/locals');
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
          <ProductProvider defaultLocal={local}>
            <FormSteps idLocal={idLocal} />
          </ProductProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateProduct;
