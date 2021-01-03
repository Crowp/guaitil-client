import React, { useContext } from 'react';
import { LocalContext } from '@/views/context';
import { InputForm } from '@/views/components/forms/inputs';

const AddressForm = ({ register, errors }) => {
  const { local, handleInputLocalChange } = useContext(LocalContext);

  const { address } = local;

  const onAddressChange = ({ name, value }) => {
    handleInputLocalChange({ name: 'address', value: { ...address, [name]: value } });
  };

  const { physicalAddress, virtualAddress } = address;
  console.log(errors);
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
      <InputForm
        type="text"
        label="Dirección virtual"
        placeholder="url google maps"
        name="virtualAddress"
        rows="4"
        id="virtualAddress"
        value={virtualAddress}
        onChange={onAddressChange}
        innerRef={register({
          required: 'Campo obligatorio'
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(AddressForm);
