import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../template/assets/styles-css/modal-styles/modalStyles.css';

const ModalInfo = props => {
  const { modal, toggle, className, size, modalTitle, children, isLanding } = props;
  console.log(isLanding);
  return (
    <div className="modal-content">
      <Modal isOpen={modal} toggle={toggle} className={className} fade size={size}>
        <ModalHeader
          toggle={toggle}
          className={isLanding ? 'modal-info-header-landing' : 'modalInfoHeader'}
          cssModule={{ 'modal-title': 'text-white' }}
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter className={isLanding ? 'modal-info-footer-landing ' : 'modalInfoFooter'}>Guaitil-Soft</ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInfo;
