import React, { useContext } from 'react';
import { ActivityContext } from '@/views/context';
import { InputForm } from '../../../../../../components/forms/inputs';

const AddressForm = ({ register, errors }) => {
  const { activity, handleActivityDescriptionChange } = useContext(ActivityContext);
  const { activityDescription } = activity;
  const { address } = activityDescription;

  const onAddressChange = ({ name, value }) => {
    handleActivityDescriptionChange({ name: 'address', value: { ...address, [name]: value } });
  };

  const { physicalAddress } = address;

  return (
    <>
      <InputForm
        type="textarea"
        label="Dirección física"
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
