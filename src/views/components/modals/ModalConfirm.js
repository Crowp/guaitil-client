import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalConfirm = ({ title, description, actions, toggle, className, modal }) => (
  <Modal isOpen={modal} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>{description}</ModalBody>
    <ModalFooter>
      {actions.map((action, index) => (
        <Button color={action.color} key={`modal-${index}`} onClick={action.onClick}>
          {action.text}
        </Button>
      ))}
    </ModalFooter>
  </Modal>
);

ModalConfirm.propTypes = {
  modal: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      color: PropTypes.string
    })
  ).isRequired
};

ModalConfirm.defaultProps = {
  modal: false
};

export default ModalConfirm;
