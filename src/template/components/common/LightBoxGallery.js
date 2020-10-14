import React from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import Lightbox from 'react-image-lightbox';

const LightBoxGallery = ({ images, children, className = '' }) => {
  const [imgIndex, setImgIndex] = React.useState(null);
  const mainSrc = images[imgIndex]?.base64 ?? images[imgIndex]?.url ?? images[imgIndex];
  const nextSrc =
    images[(imgIndex + 1) % images.length]?.base64 ??
    images[(imgIndex + 1) % images.length]?.url ??
    images[(imgIndex + 1) % images.length];
  const prevSrc =
    images[(imgIndex + images.length - 1) % images.length]?.base64 ??
    images[(imgIndex + images.length - 1) % images.length]?.url ??
    images[(imgIndex + images.length - 1) % images.length];
  return (
    <div className={className}>
      {children(setImgIndex)}
      {!isNull(imgIndex) && (
        <Lightbox
          mainSrc={mainSrc}
          nextSrc={nextSrc}
          prevSrc={prevSrc}
          onCloseRequest={() => setImgIndex(null)}
          onMovePrevRequest={() => setImgIndex((imgIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
          reactModalStyle={{ overlay: { zIndex: 999999 } }}
        />
      )}
    </div>
  );
};

LightBoxGallery.propTypes = {
  images: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired
};

export default LightBoxGallery;
