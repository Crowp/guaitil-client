import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import { isIterableArray } from '../../../../template/helpers/utils';
import LocalGrid from './LocalGrid';

export const LocalsBox = ({
  locals,
  onIndividualRoute,
  type = 'local',
  paginationData,
  paginationMeta,
  paginationHandler
}) => {
  return (
    <Card>
      <CardBody className="pb-0">
        <Row>
          {isIterableArray(locals) &&
            locals
              .filter(local => paginationData.includes(local.id))
              .map((local, index) => (
                <LocalGrid
                  localUrl={onIndividualRoute(local.id)}
                  local={local}
                  key={`${local.id}-${type}`}
                  index={index}
                  md={6}
                  lg={4}
                />
              ))}
        </Row>
      </CardBody>
      <ProductFooter meta={paginationMeta} handler={paginationHandler} />
    </Card>
  );
};
