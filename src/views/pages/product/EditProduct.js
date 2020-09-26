import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormEditSteps from './component/edit/FormEditSteps';
import Section from '../../components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../../template/helpers/utils';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import { selectAuthMemberId } from '../../../selectors/auth/AuthSelector';
import ProductAction from '../../../stores/product/ProductAction';
import { hasErrors } from '../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../stores/error/ErrorAction';
import { useHistory } from 'react-router-dom';
import LocalAction from '../../../stores/local/LocalAction';
import ProductProvider from '../../providers/ProductProvider';

const EditProduct = ({
  match: {
    params: { id }
  }
}) => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector(state => state);
  const idMember = useSelector(selectAuthMemberId);

  const isRequesting = useSelector(state => selectRequesting(state, [ProductAction.REQUEST_PRODUCT_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [ProductAction.REQUEST_PRODUCT_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(product).length;

  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(idMember));
  }, [dispatch, idMember]);

  useEffect(() => {
    if (isIterableArray(products)) {
      const [productEdit] = products.filter(pduct => pduct.id === Number(id));
      setProduct(productEdit);
    } else {
      dispatch(ProductAction.getProductById(id));
    }
  }, [products, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/products');
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
          <ProductProvider defaultProduct={product}>
            <FormEditSteps idLocal={id} />
          </ProductProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditProduct;
