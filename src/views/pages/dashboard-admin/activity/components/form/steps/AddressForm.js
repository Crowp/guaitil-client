import React, { useContext } from 'react';
import { ActivityContext } from '@/views/context';
import { InputForm } from '../../../../../../components/forms/inputs';
import { whitespacesValidation, aCharacterValidation } from '../../../../../../components/forms/inputs/validations';

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
          required: 'Campo obligatorio',
          validate: {
            whitespacesValidation,
            aCharacterValidation
          },
          minLength: {
            value: 20,
            message: 'La dirección  debe ser de al menos 20 caracteres'
          },
          maxLength: {
            value: 255,
            message: 'La dirección no puede tener mas de  255 caracteres'
          }
        })}
      />
    </>
  );
};

export default React.memo(AddressForm);
