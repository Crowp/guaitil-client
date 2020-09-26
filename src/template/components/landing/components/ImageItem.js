import React from 'react';
import { Card, CardImg } from 'reactstrap';
import LazyLoad from 'react-lazyload';
import Loader from '../../common/Loader';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText, ...props }) => {
  return (
    <Card {...props} className="m-3 bg-dark rounded-0 " style={{ height: 320, width: 350 }}>
      <LazyLoad offset={100} height={320} placeholder={<Loader />} once>
        <CardImg className="w-100 h-100" src={src} alt={altText} style={{ objectFit: 'contain' }} />
      </LazyLoad>
    </Card>
  );
};

export default ImageItem;
