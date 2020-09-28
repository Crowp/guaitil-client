import React from 'react';
import { Card, CardImg } from 'reactstrap';
import LazyLoad from 'react-lazyload';
import Loader from '../../common/Loader';
import '../../../assets/styles-css/style-landing/landing.css';

const ImageItem = ({ src, altText, ...props }) => {
  return (
    <Card {...props} className="m-3 bg-dark rounded-0 card-image">
      <LazyLoad offset={100} height={320} placeholder={<Loader />} once>
        <CardImg className="w-100 h-100 image-gallery" src={src} alt={altText} />
      </LazyLoad>
    </Card>
  );
};

export default ImageItem;
