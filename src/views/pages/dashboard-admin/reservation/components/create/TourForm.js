import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../../../components/WizardInput';
import ActivityAction from '../../../../../../stores/activity/ActivityAction';
import Select from 'react-select';
import { selectActiviyToOptions } from '../../../../../../selectors/activity/ActivitySelector';
import { useSelector, useDispatch } from 'react-redux';
import { ReservationContext } from '../../../../../context/index';

const TourForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { handleInputChangeReservation } = useContext(ReservationContext);

  const [activityId, setActivityId] = useState('');

  const activities = useSelector(selectActiviyToOptions);

  const activityObjetive = useSelector(state => state.activities);

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione el tour"
        placeholder="Seleccione el tour"
        tag={Select}
        name="activityId"
        id="activityId"
        value={activities.filter(x => x.value === activityId)[0]}
        onChange={({ value = '' }) => {
          setActivityId(value);
          const [activitySelected] = activityObjetive.filter(x => x.id === value);
          handleInputChangeReservation({
            name: 'activity',
            value: activitySelected
          });
        }}
        innerRef={register({
          required: 'Seleccione el tour'
        })}
        errors={errors}
        options={activities}
        isSearchable
      />
    </>
  );
};

export default React.memo(TourForm);
