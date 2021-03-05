import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { useLocalByIdEffect } from '../../../../hooks';
import { getLocalType } from '../../../../../utils/LocalType';

const ModalContainer = ({ modal, toggle, id }) => {
  const { local } = useLocalByIdEffect(id);
  const { localName, localType, localTelephone, member = {}, products = [], state } = local;
  const localState = state ? 'El local está activo' : 'Local inactivo';
  const { person = {} } = member;
  return (
    <ModalInfo size="" toggle={toggle} modal={modal} modalTitle="Informacion del local">
      <p>
        <span>Nombre del local :</span> {localName}
      </p>
      <p>
        <span>Tipo de local :</span> {getLocalType(localType)}
      </p>
      <p>
        <span>Estado del local :</span> {localState}
      </p>
      <p>
        <span>Telefono :</span> {localTelephone}
      </p>
      <p>
        <span>Dueño del local :</span> {person.name} {person.firstLastName} {person.secondLastName}
      </p>
      {products.length !== 0 ? (
        <div className="container">
          <span className="list">Productos del local </span>
          <ol>
            {products.map((product, index) => {
              return <li key={index}>{product.name}</li>;
            })}
          </ol>
        </div>
      ) : (
        <p>
          <span>Este local no tiene productos aún!</span>
        </p>
      )}
    </ModalInfo>
  );
};
export default ModalContainer;
