import React, { useContext } from 'react';

import WizardInput from '../../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { ActivityContext } from '../../../../context';
import { getCoordinates, getUrl } from '../../../../../utils/MapUtils';

const AddressForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);

  const { address } = activity;
  const {
    address: { virtualAddress }
  } = activity;

  const { latitude, longitude } = virtualAddress;

  const onChangeAddress = (name, value) => {
    handleInputChangeActivity({ name: 'address', value: { ...address, [name]: value } });
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
            type="text"
            label="Dirección virtual"
            placeholder="url google maps"
            name="virtualAddress"
            rows="4"
            id="virtualAddress"
            value={getUrl(latitude, longitude)}
            onChange={({ target: { name, value: url } }) => {
              const value = getCoordinates(url);
              onChangeAddress(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio'
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(AddressForm);
