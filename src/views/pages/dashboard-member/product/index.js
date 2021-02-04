import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import productTable from './ProductsTable';
import { selectProducts } from '../../../../selectors/product/ProductSelector';
import ProductAction from '../../../../stores/product/ProductAction';
import { Col, Row } from 'reactstrap';
import useGetProductsByLocalId from '../../../hooks/useGetProductsByLocalId';
import { useDispatch } from 'react-redux';
import { RouteMap } from '../../../../constants';

const ProductManagment = ({ id: idLocal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //useEffect(() => {
  // dispatch(ProductAction.getProductsByLocalId(idLocal));
  //}, [dispatch, idLocal]);

  const { isRequesting, items: product } = useGetProductsByLocalId(selectProducts, idLocal);

  console.log(product);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(product) ? (
    <productTable products={product} idLocal={idLocal} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Product.create(idLocal))}
      actionName="Registra un producto"
      title="Administración de productos"
      description="No hay productos aún!"
    />
  );
};

export default React.memo(ProductManagment);
