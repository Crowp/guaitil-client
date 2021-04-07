import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { isIterableArray } from '../../../../template/helpers/utils';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import Loader from '../../../../template/components/common/Loader';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import ProductAction from '../../../../stores/product/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import Flex from '../../../../template/components/common/Flex';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import usePagination from '../../../../template/hooks/usePagination';

const LocalDetailContent = ({ description, id }) => {
  const dispatch = useDispatch();
  const [productIds, setProductIds] = useState([]);
  const products = useSelector(state => state.products);

  const isRequesting = useSelector(state =>
    selectRequesting(state, [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID])
  );
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(productIds, 4);

  useEffect(() => {
    dispatch(ProductAction.getAllProductAcceptedByLocalId(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProductIds(products.map(product => product.id));
  }, [products, setProductIds]);

  console.log(products);
  return (
    <Card>
      <CardBody>
        <h5 className="fs-0 mb-3">Descripción</h5>
        <p>{description}</p>
        {isRequesting ? (
          <Loader />
        ) : (
          isIterableArray(products) && (
            <Element name="event-products">
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
                    <Row>
                      {products
                        .filter(product => paginationData.includes(product.id))
                        .map((product, index) => (
                          <ProductItem
                            {...product}
                            key={product.id + 'product'}
                            index={index}
                            last={index === products.filter(product => paginationData.includes(product.id)).length - 1}
                          />
                        ))}
                    </Row>
                  </CardBody>
                  <ProductFooter meta={paginationMeta} handler={paginationHandler} />
                </Card>
              </div>
            </Element>
          )
        )}
      </CardBody>
    </Card>
  );
};

LocalDetailContent.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.any
};

export default LocalDetailContent;
