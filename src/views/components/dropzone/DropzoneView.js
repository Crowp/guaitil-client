import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';
import LightBoxGallery from '@/template/components/common/LightBoxGallery';
import DropzoneViewIntem from './DropzoneViewItem';

const DropzoneView = ({ images, onImageRemove }) => {
  return (
    <Row>
      <Col>
        <LightBoxGallery images={images}>
          {openImgIndex => (
            <Row noGutters className="m-n1 overflow-auto row-product-max-height">
              {images.map((image, index) => (
                <DropzoneViewIntem
                  onImageRemove={onImageRemove}
                  onImageOpen={openImgIndex}
                  index={index}
                  image={image}
                />
              ))}
            </Row>
          )}
        </LightBoxGallery>
      </Col>
    </Row>
  );
};

DropzoneView.propTypes = {
  images: PropTypes.array.isRequired,
  onImageRemove: PropTypes.func.isRequired
};

export default DropzoneView;
