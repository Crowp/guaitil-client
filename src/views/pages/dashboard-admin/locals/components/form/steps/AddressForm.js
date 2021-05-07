import React, { useContext } from 'react';
import { LocalContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

import { whitespacesValidation } from '../../../../../../components/forms/inputs/validations';

const AddressForm = ({ register, errors }) => {
  const { local, handleLocalDescriptionChange } = useContext(LocalContext);

  const {
    localDescription: { address }
  } = local;

  const onAddressChange = ({ name, value }) => {
    handleLocalDescriptionChange({ name: 'address', value: { ...address, [name]: value } });
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
            whitespacesValidation
          },
          minLength: {
            value: 20,
            message: 'La dirección del local debe ser de al menos 20 caracteres'
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
