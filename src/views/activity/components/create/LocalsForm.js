import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../components/WizardInput';
import Select from 'react-select';
import { selectLocalsOptions } from '../../../../selectors/locals/LocalsSelector';
import { useSelector } from 'react-redux';
import { ActivityContext } from '../../../context';

const LocalsForm = ({ register, errors }) => {
  const { handleInputChangeActivity } = useContext(ActivityContext);

  const [localsIdSelected, setLocalsIdSelected] = useState([]);
  const localsOptions = useSelector(selectLocalsOptions);

  const locals = useSelector(state => state.locals);

  const localsSelected = locals.filter(local => localsIdSelected.includes(local.id));

  useEffect(() => {
    handleInputChangeActivity({
      name: 'locals',
      value: localsSelected
    });
  }, [localsIdSelected]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione los locales que van a participar"
        placeholder="Seleccione los locales"
        tag={Select}
        name="locals"
        id="locals"
        value={localsOptions.filter(option => localsIdSelected.includes(option.value))}
        onChange={({ value }) => {
          setLocalsIdSelected([...localsIdSelected, value]);
        }}
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

export default LocalsForm;
