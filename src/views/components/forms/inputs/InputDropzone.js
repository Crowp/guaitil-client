import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import FalconDropzone from '@/template/components/common/FalconDropzone';
import cloudUpload from '@/template/assets/img/icons/cloud-upload.svg';

const InputDropzone = ({ images, onChange, placeholder, warningText, onImageRemove }) => {
  return (
    <FalconDropzone
      files={images}
      onChange={enterFiles => onChange(enterFiles)}
      onImageRemove={onImageRemove}
      multiple={true}
      accept="image/*"
      placeholder={
        <>
          <Media className=" fs-0 mx-auto d-inline-flex align-items-center h-25">
            <img src={cloudUpload} alt="" width={25} className="mr-2" />
            <Media>
              <p className="fs-0 mb-0 text-700">{placeholder}</p>
            </Media>
          </Media>
          <p className="mb-0 w-75 mx-auto text-500">{warningText}</p>
        </>
      }
      preview
    />
  );
};

InputDropzone.propTypes = {
  images: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  warningText: PropTypes.string,
  onImageRemove: PropTypes.func.isRequired
};

InputDropzone.defaultProps = {
  warningText: 'Suba imagenes de un tamaño maximo de 1MB'
};

export default InputDropzone;
