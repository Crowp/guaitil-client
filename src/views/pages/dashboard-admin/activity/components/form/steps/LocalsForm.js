import React, { useContext } from 'react';
import Select from 'react-select';
import { selectLocalsDescriptionOptions } from '../../../../../../../selectors/locals/LocalsSelector';
import { SelectInputForm } from '../../../../../../components/forms/inputs';
import { ActivityContext } from '../../../../../../context';
import { useLocalsEffect } from '../../../../../../hooks';

const LocalsForm = ({ register, errors }) => {
  const { handleLocalsChange, localDescriptionIdSelected } = useContext(ActivityContext);
  const { isRequesting, items: localsOptions } = useLocalsEffect(selectLocalsDescriptionOptions);

  return (
    <>
      <SelectInputForm
        label="Seleccione los locales que van a participar"
        placeholder="Seleccione los locales"
        tag={Select}
        name="localsDescriptions"
        id="localsDescriptions"
        value={!isRequesting && localsOptions.filter(option => localDescriptionIdSelected.includes(option.value))}
        onChange={values => {
          return handleLocalsChange(values);
        }}
        innerRef={register({
          required: 'Seleccione al menos un local'
        })}
        isMulti={true}
        errors={errors}
        options={localsOptions}
      />
    </>
  );
};

export default React.memo(LocalsForm);
