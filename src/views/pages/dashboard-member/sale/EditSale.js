import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormSteps from './components/edit/FormEditSteps';
import Section from '@/template/components/common/Section';
import SaleProvider from '../../../providers/SaleProvider';
import SaleAction from '../../../../stores/sale/SaleAction';
import { hasErrors, selectRawErrors } from '../../../../selectors/error/ErrorSelector';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { isIterableArray } from '@/template/helpers/utils';
import ErrorAction from '../../../../stores/error/ErrorAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EditSale = ({
  match: {
    params: { id }
  }
}) => {
  const [sale, setSale] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { sales } = useSelector(state => state);
  const isRequesting = useSelector(state => selectRequesting(state, [SaleAction.REQUEST_SALE_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [SaleAction.REQUEST_SALE_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [SaleAction.REQUEST_SALE_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(sale).length;

  useEffect(() => {
    if (isIterableArray(sales)) {
      const [saleEdit] = sales.filter(sale => sale.id === Number(id));
      setSale(saleEdit);
    } else {
      dispatch(SaleAction.getSaleById(id));
    }
  }, [sales, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/member/locals');
      dispatch(ErrorAction.removeById(errors[SaleAction.REQUEST_SALE_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, isEmptyObject, errors]);

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
          <SaleProvider defultSale={sale}>
            <FormSteps />
          </SaleProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default React.memo(EditSale);
