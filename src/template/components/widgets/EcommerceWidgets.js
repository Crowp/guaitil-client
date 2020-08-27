import React from 'react';
import WidgetsSectionTitle from './WidgetsSectionTitle';
import WidgetsProducts from './WidgetsProducts';
import WidgetsBilling from './WidgetsBilling';
import { Row, Col } from 'reactstrap';
import CheckoutAside from '../e-commerce/checkout/CheckoutAside';

const EcommerceWidgets = () => {
  return (
    <>
      <WidgetsSectionTitle
        icon="cart-plus"
        title="E-commerce"
        subtitle="Find more cards which are delicately made for E-commerce."
        transform="shrink-1"
      />
      <WidgetsProducts />
      <Row className="mt-3" noGutters>
        <Col lg={6} className="pr-lg-2 mb-3 mb-lg-0">
          <WidgetsBilling />
        </Col>
        <Col lg={6} className="pl-lg-2">
          <CheckoutAside />
        </Col>
      </Row>
    </>
  );
};

export default EcommerceWidgets;
