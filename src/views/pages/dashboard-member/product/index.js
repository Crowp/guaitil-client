import React from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import { selectProducts } from '../../../../selectors/product/ProductSelector';
import { Col, Row } from 'reactstrap';
import { RouteMap } from '../../../../constants';
import useProductsEffect from '../../../hooks/useProductsEffect';
import ProductsTable from './ProductsTable';

const ProductManagment = ({ localId }) => {
  const history = useHistory();

  const { isRequesting, items: product } = useProductsEffect(selectProducts, localId);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(product) ? (
    <ProductsTable products={product} localId={localId} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.LocalMember.createProduct(localId))}
      actionName="Registra un producto"
      title="Administración de productos"
      description="No hay productos aún!"
    />
  );
};

export default React.memo(ProductManagment);
