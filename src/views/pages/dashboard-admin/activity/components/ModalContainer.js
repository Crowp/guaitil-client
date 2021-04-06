import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import useActivityByIdEffect from '../../../../hooks/useActivityByIdEffect';
import { getActivityType } from '../../../../../utils/ActivityType';

const ModalContainer = ({ modal, toggle, id }) => {
  const { activity } = useActivityByIdEffect(id);
  const { activityDescription = {}, isActive, localsDescriptions = [] } = activity;
  console.log(activityDescription);
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local">
      <p>
        <span>Nombre de la actividad :</span> {activityDescription.name}
      </p>
      <p>
        <span>Tipo de actividad :</span> {getActivityType(activityDescription.activityType)}
      </p>
      {activityDescription.activityType === 'TOUR' && (
        <p>
          <span> Precio por persona : </span> {activityDescription.personPrice}{' '}
        </p>
      )}
      <p>
        <span>Estado de la actividad :</span> {isActive === true ? 'Activa' : 'Inactiva'}
      </p>
      <p>
        <span>Fecha de actividad :</span> {activityDescription.activityDate}
      </p>
      <p>
        <span>Descripción :</span> {activityDescription.description}
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
