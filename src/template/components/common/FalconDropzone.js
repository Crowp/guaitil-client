import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import { isIterableArray } from '../../helpers/utils';
import { DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from 'reactstrap';
import Flex from './Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cloudUpload from '../../assets/img/icons/cloud-upload.svg';
import LightBoxGallery from './LightBoxGallery';

const getSize = size => {
  if (size < 1024) {
    return (
      <Fragment>
        <strong>{size}</strong> Byte
      </Fragment>
    );
  } else if (size < 1024 * 1024) {
    return (
      <Fragment>
        <strong>{(size / 1024).toFixed(2)}</strong> KB
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <strong>{(size / (1024 * 1024)).toFixed(2)}</strong> MB
      </Fragment>
    );
  }
};

const FalconDropzone = ({
  placeholder,
  className,
  onChange,
  files,
  onImageRemove,
  preview,
  maxHeight = 150,
  readOnly = false,
  ...rest
}) => (
  <Fragment>
    <Dropzone
      onDrop={acceptedFiles => {
        const stringFiles = [];
        if (!!acceptedFiles.length) {
          acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              stringFiles.push({
                id: uuid(),
                base64: reader.result,
                size: file.size,
                path: file.path,
                type: file.type
              });
              onChange([...stringFiles]);
            };
            return true;
          });
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: classNames(
              'p-3 border-dashed border-2x border-300 bg-light rounded-soft text-center cursor-pointer',
              className,
              {
                'd-none': readOnly
              }
            )
          })}
        >
          <input {...{ ...getInputProps(), ...rest }} />
          {placeholder}
        </div>
      )}
    </Dropzone>
    {preview && isIterableArray(files) && (
      <LightBoxGallery images={files}>
        {openImgIndex => (
          <div className="border-top mt-3 overflow-auto" style={{ height: maxHeight, minHeight: 150 }}>
            {files.map((fileProps, index) => (
              <FileItem
                {...fileProps}
                key={`${fileProps.id}-image-${index}`}
                index={index}
                onImageRemove={onImageRemove}
                openImage={openImgIndex}
                readOnly={readOnly}
              />
            ))}
          </div>
        )}
      </LightBoxGallery>
    )}
  </Fragment>
);

const FileItem = ({ index, id, path, base64, url, fileName, size, onImageRemove, openImage, readOnly = false }) => (
  <Media className="align-items-center py-3 border-bottom btn-reveal-trigger" key={id}>
    <img className="img-fluid d-none d-sm-inline mr-3" width={38} src={base64 || url} alt={path || fileName} />
    <Flex body tag={Media} justify="between" align="center">
      <div>
        <h6 className="text-break">{path || fileName}</h6>
        <Flex className="position-relative" align="center">
          <p className="mb-0 fs--1 text-400 line-height-1">{getSize(size)}</p>
        </Flex>
      </div>
      <UncontrolledDropdown className="text-sans-serif">
        <DropdownToggle color="link" size="sm" className="text-600 btn-reveal">
          <FontAwesomeIcon icon="ellipsis-h" />
        </DropdownToggle>
        <DropdownMenu className="border py-0" right>
          <div className="bg-white py-2">
            <DropdownItem className="text-primary" onClick={() => openImage(index)}>
              Ver Imagen
            </DropdownItem>
            <DropdownItem
              className={classNames('text-danger', {
                'd-none': readOnly
              })}
              onClick={() => onImageRemove(id)}
            >
              Remover Imagen
            </DropdownItem>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Flex>
  </Media>
);

FalconDropzone.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  files: PropTypes.array,
  preview: PropTypes.bool,
  isMulti: PropTypes.bool,
  onImageRemove: PropTypes.func
};

FalconDropzone.defaultProps = {
  placeholder: <img src={cloudUpload} alt="" width={25} className="mr-2" />,
  files: [],
  preview: false
};

export default FalconDropzone;
