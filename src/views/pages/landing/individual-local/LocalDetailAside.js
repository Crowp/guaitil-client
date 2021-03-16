import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Card, CardBody } from 'reactstrap';
import { isIterableArray } from '../../../../template/helpers/utils';
import '../../../../template/assets/styles-css/header-form/dashboard.css';

const LocalDetailAside = ({ address: { physicalAddress }, products }) => {
  const scrollToEventMap = e => {
    e.preventDefault();
    scroller.scrollTo('event-products', {
      smooth: true
    });
  };

  return (
    <Card className="mb-3 fs--1">
      <CardBody>
        <h6>Dirección</h6>
        <div className="mb-1">{physicalAddress}</div>
        {isIterableArray(products) && (
          <Link to="#!" onClick={scrollToEventMap}>
            Ver productos
          </Link>
        )}
      </CardBody>
    </Card>
  );
};

const AddressProps = {
  physicalAddress: PropTypes.string
};

LocalDetailAside.propTypes = {
  address: PropTypes.shape(AddressProps),
  products: PropTypes.array
};

LocalDetailAside.defaultProps = {
  products: []
};

export default LocalDetailAside;
