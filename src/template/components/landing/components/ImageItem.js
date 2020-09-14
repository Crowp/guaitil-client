import React from 'react';
import { Card, CardImg } from 'reactstrap';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText }) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={src} alt={altText} style={{ borderRadius: '5px' }} />
      </Card>
    </div>
  );
};

export default ImageItem;
