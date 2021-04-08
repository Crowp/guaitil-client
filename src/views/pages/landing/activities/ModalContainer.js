import React from 'react';
import ModalInfo from '../../../components/modals/ModalInfo';
import '../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getActivityType } from '../../../../utils/ActivityType';

const ModalContainer = ({ modal, toggle, item = {} }) => {
  const {
    activityDescription: {
      name,
      activityType,
      personPrice,
      activityDate,
      description,
      address: { physicalAddress }
    },
    localsDescriptions
  } = item;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Contacto" isLanding={true}>
      <p>
        <span>Nombre de la actividad :</span> {name}
      </p>
      <p>
        <span>Tipo de actividad :</span> {getActivityType(activityType)}
      </p>
      {activityType === 'TOUR' && (
        <p>
          <span> Precio por persona : </span> {personPrice}{' '}
        </p>
      )}
      <p>
        <span>Fecha y hora de actividad :</span> {activityDate}
      </p>
      <p>
        <span>Descripción :</span> {description}
      </p>
      <p>
        <span>Dirección :</span> {physicalAddress}
      </p>
      <div>
        <span>locales a participar en la actividad </span>
        <ol>
          {localsDescriptions.map((local, index) => {
            return <li key={index}>{local.localName}</li>;
          })}
        </ol>
      </div>
    </ModalInfo>
  );
};
export default ModalContainer;
