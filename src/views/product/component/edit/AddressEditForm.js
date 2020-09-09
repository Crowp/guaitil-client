import React, { useContext } from 'react';

import WizardInput from '../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { LocalContext } from '../../../context';

const AddressForm = ({ register, errors }) => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);

  const { address } = local;
  const {
    address: { virtualAddress }
  } = local;

  const onChangeAddress = (name, value) => {
    handleInputChangeLocal({ name: 'address', value: { ...address, [name]: value } });
  };
  const onVirtualAddressChange = (name, value) => {
    onChangeAddress('virtualAddress', { ...virtualAddress, [name]: value });
  };
  return (
    <>
      <WizardInput
        type="textarea"
        label="Dirección fisica"
        name="physicalAddress"
        rows="4"
        style={{ resize: 'none' }}
        id="physicalAddress"
        value={address}
        onChange={({ target: { name, value } }) => {
          onChangeAddress(name, value);
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
            name="longitude"
            id="longitude"
            value={virtualAddress}
            onChange={({ target: { name, value } }) => {
              onVirtualAddressChange(name, value);
            }}
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
            id="latitude"
            name="latitude"
            value={virtualAddress}
            onChange={({ target: { name, value } }) => {
              onVirtualAddressChange(name, value);
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

export default AddressForm;
