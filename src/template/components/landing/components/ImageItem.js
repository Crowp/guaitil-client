import React from 'react';
import { Card, CardImg } from 'reactstrap';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText, ...props }) => {
  return (
    <Card {...props} className="m-3 bg-dark rounded-0 card-image">
      <CardImg data-sizes="auto" className="lazyload w-100 h-100 image-gallery" data-src={src} alt={altText} />
    </Card>
  );
};

export default ImageItem;
