import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import useMemberByIdEffect from '../../../../hooks/useMemberByIdEffect';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { useUserByIdEffect } from '../../../../hooks';

const ModalContainer = ({ modal, toggle, id }) => {
  const {
    user: { member = {}, roles = [] }
  } = useUserByIdEffect(id);
  const { person = {}, memberType, affiliationDate, occupation } = member;
  const showMemberType = memberType === 'REGULAR' ? 'regular' : 'Asociado';

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local">
      <p>
        <span>Nombre de asociado :</span> {person.name} {person.firstLastName} {person.secondLastName}
      </p>
      <p>
        <span>Tipo de miembro :</span> {showMemberType}
      </p>
      <p>
        <span>Fecha de afiliación :</span> {affiliationDate}
      </p>
      <p>
        <span>Ocupación:</span> {occupation}
      </p>
      <div>
        <span>Roles de usuario</span>
        <ol>
          {roles.map((role, index) => {
            return (
              <li key={index}>
                {role === 'ROLE_ADMIN'
                  ? 'Administrador'
                  : role === 'ROLE_SUPER_ADMIN'
                  ? 'Súper administrador'
                  : 'Miembro'}
              </li>
            );
          })}
        </ol>
      </div>
    </ModalInfo>
  );
};
export default ModalContainer;
