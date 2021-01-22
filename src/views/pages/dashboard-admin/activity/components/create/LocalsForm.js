import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../../../components/WizardInput';
import Select from 'react-select';
import { selectLocalsOptions } from '../../../../../../selectors/locals/LocalsSelector';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityContext } from '../../../../../context';
import LocalAction from '../../../../../../stores/local/LocalAction';

const LocalsForm = ({ register, errors }) => {
  const dispatch = useDispatch();
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);

  const [localsIdSelected, setLocalsIdSelected] = useState(activity.locals?.map(local => local.id) || []);
  const localsOptions = useSelector(selectLocalsOptions);

  const locals = useSelector(state => state.locals);

  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);

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
