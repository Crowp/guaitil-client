import React, { useContext } from 'react';
import { ActivityContext } from '@/views/context';
import { InputForm } from '../../../../../../components/forms/inputs';

const AddressForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);

  const onAddressChange = ({ name, value }) => {
    handleInputChangeActivity({ name: 'address', value: { ...address, [name]: value } });
  };
  const { address } = activity;

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
