import React, { useContext } from 'react';
import Select from 'react-select';
import {
  selectLocalsDescriptionOptions,
  selectLocalsOptions
} from '../../../../../../../selectors/locals/LocalsSelector';
import { SelectInputForm } from '../../../../../../components/forms/inputs';
import { ActivityContext } from '../../../../../../context';
import { useLocalsEffect } from '../../../../../../hooks';

const LocalsForm = ({ register, errors }) => {
  const { handleLocalsChange, localsIdSelected } = useContext(ActivityContext);
  const { isRequesting, items: localsOptions } = useLocalsEffect(selectLocalsDescriptionOptions);
  console.log(localsOptions);

  return (
    <>
      <SelectInputForm
        label="Seleccione los locales que van a participar"
        placeholder="Seleccione los locales"
        tag={Select}
        name="locals"
        id="locals"
        value={!isRequesting && localsOptions.filter(option => localsIdSelected.includes(option.value))}
        onChange={values => {
          console.log(values);
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

/* return (
    <WizardInput
      type="select"
      label="Seleccione los locales que van a participar"
      placeholder="Seleccione los locales"
      tag={Select}
      name="locals"
      id="locals"
      value={!isRequesting && localsOptions.filter(option => localsIdSelected.includes(option.value))}
      onChange={values => {
        console.log(values);
        handleLocalsChange(values);
      }}
      innerRef={register({
        required: 'Seleccione al menos un local'
      })}
      isMulti={true}
      errors={errors}
      options={localsOptions}
    />
  );
};
*/
export default React.memo(LocalsForm);
