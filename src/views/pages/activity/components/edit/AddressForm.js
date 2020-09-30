import React, { useContext } from 'react';

import WizardInput from '../../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { ActivityContext } from '../../../../context';

const AddressForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);

  const { address } = activity;
  const {
    address: { virtualAddress }
  } = activity;

  const onChangeAddress = (name, value) => {
    handleInputChangeActivity({ name: 'address', value: { ...address, [name]: value } });
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
            label="Direccción virtual"
            placeholder="Dirección..."
            name="virtualAddress"
            id="virtualAddress"
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
      </Row>
    </>
  );
};

export default React.memo(AddressForm);
