import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledCarousel } from 'reactstrap';

const Slider = ({ images }) => <UncontrolledCarousel items={images} />;

const Item = {
  src: PropTypes.any.isRequired,
  caption: PropTypes.string.isRequired,
  key: PropTypes.any.isRequired,
  altText: PropTypes.string
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(Item))
};

Slider.defaultProps = {
  images: []
};

export default Slider;
