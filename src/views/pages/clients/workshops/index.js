import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import Loader from '../../../../template/components/common/Loader';
import useFakeFetch from '../../../../template/hooks/useFakeFetch';
import { isIterableArray } from '../../../../template/helpers/utils';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Product from '../../../../template/components/e-commerce/product/Product';
import classNames from 'classnames';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import usePagination from '../../../../template/hooks/usePagination';
import { ProductContext } from '../../../../template/context/Context';
import Section from '../../../../template/components/common/Section';

const Products = ({ match, location }) => {
  // Context
  const { products } = useContext(ProductContext);

  // State
  const [productIds, setProductIds] = useState([]);

  // Hook
  const { loading } = useFakeFetch(products);
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(productIds, 4);

  const { productLayout } = match.params;
  const isList = productLayout === 'list';
  const isGrid = productLayout === 'grid';

  useEffect(() => {
    setProductIds(products.map(product => product.id));
  }, [products, setProductIds]);

  return (
    <Fragment>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <Card>
          <CardBody className={classNames({ 'p-0  overflow-hidden': isList, 'pb-0': isGrid })}>
            {loading ? (
              <Loader />
            ) : (
              <Row noGutters={isList}>
                {isIterableArray(products) &&
                  products
                    .filter(product => paginationData.includes(product.id))
                    .map((product, index) => <Product {...product} key={product.id} index={index} />)}
              </Row>
            )}
          </CardBody>
          <ProductFooter meta={paginationMeta} handler={paginationHandler} />
        </Card>
      </Section>
    </Fragment>
  );
};

export default Products;
