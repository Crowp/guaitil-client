import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../template/assets/styles-css/modal-styles/modalStyles.css';

const ModalInfo = props => {
  const { modal, toggle, className, size, modalTitle, children } = props;
  return (
    <div className="modal-content">
      <Modal isOpen={modal} toggle={toggle} className={className} fade size={size}>
        <ModalHeader toggle={toggle} className="modal-header">
          {modalTitle}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter className="modal-footer">Guaitil-Soft</ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInfo;
