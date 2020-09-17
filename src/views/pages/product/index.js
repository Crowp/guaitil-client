import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../components/extra/Starter';
import { isIterableArray } from '../../../template/helpers/utils';
import ProductsTable from './ProductsTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from '../../../selectors/product/ProductSelector';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import ProductAction from '../../../stores/product/ProductAction';
import { Col, Row } from 'reactstrap';

const ProductManagment = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(selectProducts);
  const isRequesting = useSelector(state => selectRequesting(state, [ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID]));

  useEffect(() => {
    dispatch(ProductAction.getProductsByLocalId(id));
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(products) ? (
    <ProductsTable products={products} id={id} />
  ) : (
    <Starter
      action={() => history.push(id + '/product/create')}
      actionName="Registra un producto"
      title="Administración de productos"
      description="No hay productos aún!"
    />
  );
};

export default ProductManagment;
