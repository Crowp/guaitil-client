import React from 'react';
import ModalInfo from '../../../components/modals/ModalInfo';
import '../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getActivityType } from '../../../../utils/ActivityType';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

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
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Contacto" isLanding={true} size="lg">
      <Row form>
        <Col sm={6}>
          <FormGroup>
            <Label for="activityName">Nombre de la actividad</Label>
            <Input id="activityName" name="activityName" value={name} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="activityType">Tipo de actividad</Label>
            <Input id="activityType" name="activityType" value={getActivityType(activityType)} disabled={true} />
          </FormGroup>
        </Col>
        {activityType === 'TOUR' && (
          <Col sm={6}>
            <FormGroup>
              <Label for="personPrice">Precio por persona</Label>
              <Input id="personPrice" name="personPrice" value={personPrice} disabled={true} />
            </FormGroup>
          </Col>
        )}
        <Col sm={6}>
          <FormGroup>
            <Label for="activityDate">Fecha y hora de actividad</Label>
            <Input id="activityDate" name="activityDate" value={activityDate} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label>Descripción</Label>
            <Input
              type="textarea"
              id="description"
              name="description"
              rows="4"
              value={description}
              style={{ resize: 'none' }}
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
