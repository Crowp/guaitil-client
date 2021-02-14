import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ContactModal = props => {
  const { modal, toggle, className, modalTitle, item, size } = props;
  const { person = {} } = item;
  const { address = {} } = item;

  return (
    <div className="container-fluid">
      <Modal isOpen={modal} toggle={toggle} className={className} fade autoFocus size={size}>
        <ModalHeader className="text-center" toggle={toggle}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>{person.name ? `Propietario : ${person.name}` : `Descripción : ${item.description}`}</ModalBody>
        <ModalBody>{person.email ? `Correo : ${person.email}` : `Direccion: ${address.physicalAddress}`}</ModalBody>
        <ModalBody>
          {person.telephone ? `Telefono : ${person.telephone}` : `Precio por persona : ₡${item.personCost}`}
        </ModalBody>
        <ModalBody>{item.description && `Email : Guaitil@gmail.com`}</ModalBody>
        <ModalFooter color="secondary">
          <Button color="primary" onClick={toggle}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactModal;
