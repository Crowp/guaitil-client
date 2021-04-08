import React from 'react';
import '../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import ModalInfo from '../../../components/modals/ModalInfo';

const ModalContainer = ({ toggle, modal, item }) => {
  const { member = {}, localDescription = {} } = item;
  const { person = {} } = member;
  const { name, firstLastName, secondLastName, telephone, email } = person;
  const { localTelephone, localName, description } = localDescription;

  return (
    <ModalInfo isLanding={true} toggle={toggle} modal={modal} modalTitle="Contacto">
      <p>
        <span>Nombre del local: </span> {localName}
      </p>
      <p>
        <span>Descripción del local: </span> {description}
      </p>
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
    </ModalInfo>
  );
};

export default ModalContainer;
