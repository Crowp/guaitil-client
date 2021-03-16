import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../template/assets/styles-css/modal-styles/modalStyles.css';

const ContactModal = props => {
  const { modal, toggle, className, item, size, modalTitle } = props;
  const { member = {}, localTelephone } = item;
  const { person = {} } = member;
  const { name, firstLastName, secondLastName, telephone, email } = person;

  return (
    <div className="modal-content">
      <Modal isOpen={modal} toggle={toggle} className={className} fade size={size}>
        <ModalHeader toggle={toggle} className="modal-header">
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <p>
            <span>Nombre del propietario: </span> {name} {firstLastName} {secondLastName}
          </p>
          <p>
            <span>Correo electronico: </span> {email}
          </p>
          <p>
            <span>Telefono del local: </span> {localTelephone}
          </p>
          <p>
            <span>Telefono del propietario: </span> {telephone}
          </p>
        </ModalBody>
        <ModalFooter className="modal-footer">Guaitil-Soft</ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactModal;
