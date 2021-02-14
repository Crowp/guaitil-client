import React, { useContext } from 'react';
import WizardInput from '../../../../../../components/WizardInput';
import Select from 'react-select';
import { selectLocalsOptions } from '../../../../../../../selectors/locals/LocalsSelector';
import { ActivityContext } from '../../../../../../context';
import { useLocalsEffect } from '../../../../../../hooks';

const LocalsForm = ({ register, errors }) => {
  const { handleLocalsChange, localsIdSelected } = useContext(ActivityContext);
  const { isRequesting, items: localsOptions } = useLocalsEffect(selectLocalsOptions);
  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione los locales que van a participar"
        placeholder="Seleccione los locales"
        tag={Select}
        name="locals"
        id="locals"
        value={!isRequesting && localsOptions.filter(option => localsIdSelected.includes(option.value))}
        onChange={values => handleLocalsChange(values)}
        innerRef={register({
          required: 'Seleccione al menos un local'
        })}
        errors={errors}
        options={localsOptions}
        isSearchable
        isMulti
        closeMenuOnSelect={false}
      />
    </>
  );
};

export default React.memo(LocalsForm);
