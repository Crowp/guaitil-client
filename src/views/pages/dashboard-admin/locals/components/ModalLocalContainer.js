import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { useLocalByIdEffect } from '../../../../hooks';
import { getLocalType } from '../../../../../utils/LocalType';

const ModalContainer = ({ modal, toggle, id }) => {
  const { local = {} } = useLocalByIdEffect(id);
  const { localDescription = {}, member = {}, products = [], showLocal } = local;
  const { localName, localType, localTelephone } = localDescription;
  const localState = showLocal ? 'El local está activo' : 'Local inactivo';
  const { person = {} } = member;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local">
      <p>Nombre del local : {localName}</p>
      <p>Tipo de local : {getLocalType(localType)}</p>
      <p>Estado del local : {localState}</p>
      <p>Teléfono : {localTelephone}</p>
      <p>
        Dueño del local : {person.name} {person.firstLastName} {person.secondLastName}
      </p>
      {products.length !== 0 ? (
        <div>
          Productos del local
          <ol>
            {products.map((product, index) => {
              return <li key={index}>{product.productDescription.name}</li>;
            })}
          </ol>
        </div>
      ) : (
        <p>Este local no tiene productos aún</p>
      )}
    </ModalInfo>
  );
};
export default ModalContainer;
