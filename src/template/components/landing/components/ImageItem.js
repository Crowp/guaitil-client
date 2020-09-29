import React from 'react';
import { Card, CardImg } from 'reactstrap';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText, ...props }) => {
  return (
    <Card {...props} className="m-3 bg-dark rounded-0 card-image">
      <CardImg loading="lazy" className="w-100 h-100 image-gallery" src={src} alt={altText} />
    </Card>
  );
};

export default ImageItem;
