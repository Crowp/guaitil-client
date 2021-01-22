import React, { useContext, useState } from 'react';
import WizardInput from '../../../../../components/WizardInput';
import Select from 'react-select';
import { selectLocalsOptions } from '@/selectors/locals/LocalsSelector';
import { useSelector } from 'react-redux';
import { ActivityContext } from '@/views/context';

const LocalsForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);
  const [localsIdSelected, setLocalsIdSelected] = useState(activity.locals?.map(item => item.id) || []);
  const localsOptions = useSelector(selectLocalsOptions);

  const locals = useSelector(state => state.locals);

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
        onChange={values => {
          const options = values ? values : [];
          const localsIds = [...options.map(item => item.value)];
          setLocalsIdSelected(localsIds);
          const localsSelected = locals.filter(local => localsIds.includes(local.id));
          handleInputChangeActivity({
            name: 'locals',
            value: localsSelected
          });
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

export default React.memo(LocalsForm);
