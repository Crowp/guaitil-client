import React from 'react';
import { Card, CardImg } from 'reactstrap';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText, ...props }) => {
  return (
    <Card {...props} className="m-3 bg-dark rounded-0" style={{ height: 320, width: 350 }}>
      <CardImg className="w-100 h-100" src={src} alt={altText} style={{ objectFit: 'contain' }} />
    </Card>
  );
};

export default ImageItem;
