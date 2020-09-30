import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Loader from '../../../../template/components/common/Loader';
import useFakeFetch from '../../../../template/hooks/useFakeFetch';
import { isIterableArray } from '../../../../template/helpers/utils';
import ProductList from './ProductList';
import Flex from '../../../../template/components/common/Flex';
import { useSelector, useDispatch } from 'react-redux';
import { hasErrors, selectRawErrors } from '../../../../selectors/error/ErrorSelector';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import usePagination from '../../../../template/hooks/usePagination';
import ProductAction from '../../../../stores/product/ProductAction';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import ErrorAction from '../../../../stores/error/ErrorAction';

const Products = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const [productIds, setProductIds] = useState([]);
  const products = useSelector(state => state.products);

  const history = useHistory();
  const isRequesting = useSelector(state =>
    selectRequesting(state, [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID])
  );
  const exitsErrors = useSelector(state =>
    hasErrors(state, [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID_FINISHED])
  );
  const errors = useSelector(state =>
    selectRawErrors(state, [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID_FINISHED])
  );
  const isEmptyObject = !Object.keys(products).length;

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/');
      dispatch(ErrorAction.removeById(errors[ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, isEmptyObject, errors]);

  useEffect(() => {
    dispatch(ProductAction.getAllProductAcceptedByLocalId(id));
  }, [dispatch, id]);

  const { loading } = useFakeFetch(products);
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(productIds, 4);

  useEffect(() => {
    setProductIds(products.map(product => product.id));
  }, [products, setProductIds]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Fragment>
      <div className="container">
        <Card className="mb-3">
          <CardBody>
            <Row className="justify-content-between align-items-center">
              <Col sm="auto" className="mb-2 mb-sm-0" tag={Flex} align="center">
                <h6 className="mb-0 text-nowrap ml-2 ">Productos</h6>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-0  overflow-hidden">
            {loading ? (
              <Loader />
            ) : (
              <Row>
                {isIterableArray(products) &&
                  products
                    .filter(product => paginationData.includes(product.id))
                    .map((product, index) => <ProductList product={product} key={product.id} index={index} />)}
              </Row>
            )}
          </CardBody>
          <ProductFooter meta={paginationMeta} handler={paginationHandler} />
        </Card>
      </div>
    </Fragment>
  );
};

export default Products;
