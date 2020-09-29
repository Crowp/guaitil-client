import React, { useContext } from 'react';
import WizardInput from '../../../../../components/WizardInput';
import { LocalContext } from '../../../../../context';

const AddressForm = ({ register, errors }) => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);

  const { address } = local;
  const {
    address: { virtualAddress }
  } = local;
  console.log(virtualAddress);
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
      <WizardInput
        type="text"
        label="Dirección virtual"
        name="virtualAddress"
        rows="4"
        style={{ resize: 'none' }}
        id="virtualAddress"
        value={virtualAddress}
        onChange={({ target: { name, value } }) => {
          onVirtualAddressChange(name, value);
        }}
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(AddressForm);
