import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import useActivityByIdEffect from '../../../../hooks/useActivityByIdEffect';
import { getActivityType } from '../../../../../utils/ActivityType';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

const ModalContainer = ({ modal, toggle, id }) => {
  const { activity } = useActivityByIdEffect(id);
  const { activityDescription = {}, isActive, localsDescriptions = [] } = activity;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local" isLanding={false} size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="name">Nombre de la actividad</Label>
            <Input id="name" name="name" value={activityDescription.name} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="activityType">Tipo de actividad</Label>
            <Input
              id="activityType"
              name="activityType"
              value={getActivityType(activityDescription.activityType)}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="activityState">Estado de la actividad</Label>
            <Input
              id="activityState"
              name="activityState"
              value={isActive === true ? 'Activa' : 'Inactiva'}
              disabled={true}
            />
          </FormGroup>
        </Col>
        {activityDescription.activityType === 'TOUR' && (
          <Col sm={12}>
            <FormGroup>
              <Label for="personPrice">Precio por persona</Label>
              <Input id="personPrice" name="personPrice" value={activityDescription.personPrice} disabled={true} />
            </FormGroup>
          </Col>
        )}
        <Col sm={12}>
          <FormGroup>
            <Label for="activityDate">Fecha de actividad</Label>
            <Input id="activityDate" name="activityDate" value={activityDescription.activityDate} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="description">Fecha de actividad</Label>
            <Input
              id="description"
              type="textarea"
              rows="4"
              style={{ resize: 'none' }}
              name="description"
              value={activityDescription.description}
              disabled={true}
            />
          </FormGroup>
        </Col>
      </Row>
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
