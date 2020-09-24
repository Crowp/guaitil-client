import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import Loader from '../../../../template/components/common/Loader';
import useFakeFetch from '../../../../template/hooks/useFakeFetch';
import { isIterableArray } from '../../../../template/helpers/utils';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Local from '../../../../template/components/e-commerce/lodgin/Local';
import classNames from 'classnames';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import { useSelector, useDispatch } from 'react-redux';
import usePagination from '../../../../template/hooks/usePagination';
import Section from '../../../../template/components/common/Section';
import LocalAction from '../../../../stores/local/LocalAction';

const Products = ({ match, location }) => {
  const dispatch = useDispatch();
  // Context
  const locals = useSelector(state => state.locals);

  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);
  // State
  const [localIds, setLocalIds] = useState([]);

  // Hook
  const { loading } = useFakeFetch(locals);
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(localIds, 4);

  const { productLayout } = match.params;
  const isList = productLayout === 'list';
  const isGrid = productLayout === 'grid';

  useEffect(() => {
    setLocalIds(locals.map(local => local.id));
  }, [locals, setLocalIds]);

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
                {isIterableArray(locals) &&
                  locals
                    .filter(local => paginationData.includes(local.id))
                    .map((local, index) => <Local {...local} key={local.id} index={index} />)}
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
