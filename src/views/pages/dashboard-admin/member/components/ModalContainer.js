import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import useMemberByIdEffect from '../../../../hooks/useMemberByIdEffect';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';

const ModalContainer = ({ modal, toggle, id }) => {
  const { member } = useMemberByIdEffect(id);
  const { locals = [], occupation, person = {}, memberType } = member;
  const showMemberType = memberType === 'REGULAR' ? 'regular' : 'Asociado';
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Informacion del miembro">
      <p>
        <span>Cedula :</span> {person.id}
      </p>
      <p>
        <span>Nombre :</span> {person.name} {person.firstLastName} {person.secondLastName}
      </p>
      <p>
        <span>Correo electronico :</span> {person.email}
      </p>
      <p>
        <span>Telefono :</span> {person.telephone}
      </p>
      <p>
        <span>Ocupación: </span> {occupation}
      </p>
      <p>
        <span>Tipo de miembro: </span> {showMemberType}
      </p>
      {locals.length !== 0 ? (
        <div className="modal-info-container">
          <span>Locales a cargo </span>
          <ol>
            {locals.map((local, index) => {
              return <li key={index}>{local.localDescription.localName}</li>;
            })}
          </ol>
        </div>
      ) : (
        <p>
          <span>Este miembro no tiene locales a cargo </span>
        </p>
      )}
    </ModalInfo>
  );
};
export default ModalContainer;
