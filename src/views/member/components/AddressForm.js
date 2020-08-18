import React, { useContext } from 'react';

import WizardInput from '../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { LocalContext } from '../../context';

const LocalForm = ({ register, errors }) => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  return (
    <>
      <WizardInput
        type="textarea"
        label="Dirección fisica"
        name="physicalAddress"
        rows="2"
        style={{ resize: 'none' }}
        id="physicalAddress"
        value={local}
        onChange={({ target }) => {
          handleInputChangeLocal(target);
        }}
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Logitud del local"
            placeholder="Longitud..."
            name="long"
            value={local}
            onChange={({ target }) => {
              handleInputChangeLocal(target);
            }}
            id="long"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'La longitud debe ser de al menos 2 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Latitud del local*"
            placeholder="Latitud"
            id="lat"
            name="lat"
            value={local}
            onChange={({ target }) => {
              handleInputChangeLocal(target);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'La latitud debe ser de al menos 2 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default LocalForm;
