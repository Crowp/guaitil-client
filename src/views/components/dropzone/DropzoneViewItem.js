import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardImg } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const DropzoneViewItem = ({ image, index, onImageRemove, onImageOpen }) => {
  return (
    <Col xs={6} className="p-1 position-relative">
      <FontAwesomeIcon
        className="position-absolute text-light icon-style"
        icon={faTimesCircle}
        size="lg"
        onClick={onImageRemove(index)}
      />
      <Card
        className="bg-dark text-white card-max-width"
        inverse
        style={{ maxWidth: '30rem' }}
        onClick={() => onImageOpen(index)}
      >
        <CardImg loading="lazy" src={image.base64} alt="Card image cap" />
      </Card>
    </Col>
  );
};

DropzoneViewItem.propTypes = {
  image: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  onImageOpen: PropTypes.func.isRequired
};

export default DropzoneViewItem;
