import React, { useContext } from 'react';
import { MemberContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

const AddressForm = ({ register, errors, control }) => {
  const { local, handleLocalDescriptionChange } = useContext(MemberContext);
  const { localDescription } = local;
  const { address } = localDescription;
  const { physicalAddress } = address;

  const onAddressChange = ({ name, value }) => {
    handleLocalDescriptionChange({ name: 'address', value: { ...address, [name]: value } });
  };

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
