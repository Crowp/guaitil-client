import React, { useContext } from 'react';
import { LocalContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

const AddressForm = ({ register, errors }) => {
  const { local, handleLocalChange } = useContext(LocalContext);

  const { address } = local;

  const onAddressChange = ({ name, value }) => {
    handleLocalChange({ name: 'address', value: { ...address, [name]: value } });
  };

  const { physicalAddress } = address;
  return (
    <>
      <InputForm
        type="textarea"
        label="Dirección fisica"
        name="physicalAddress"
        rows="4"
        style={{ resize: 'none' }}
        id="physicalAddress"
        value={physicalAddress}
        onChange={onAddressChange}
        errors={errors}
        innerRef={register({
          required: 'Campo obligatorio'
        })}
      />
    </>
  );
};

export default React.memo(AddressForm);
