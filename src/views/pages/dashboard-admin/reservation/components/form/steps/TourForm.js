import React, { useContext, useEffect } from 'react';
import ActivityAction from '../../../../../../../stores/activity/ActivityAction';
import { selectActiviyDescriptionToOptions } from '../../../../../../../selectors/activity/ActivitySelector';
import { useDispatch } from 'react-redux';
import { ReservationContext } from '../../../../../../context/index';
import { SelectInputForm } from '../../../../../../components/forms/inputs';
import useActivitiesEffect from '../../../../../../hooks/useActivitiesEffect';

const TourForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { reservation, handleActivityChange } = useContext(ReservationContext);
  const { activityDescription } = reservation;
  const { items: activities } = useActivitiesEffect(selectActiviyDescriptionToOptions);
  console.log(activities);
  console.log(activityDescription);

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  return (
    <>
      <SelectInputForm
        type="select"
        label="Seleccione el tour"
        name="activityDescription"
        id="activityDescription"
        placeholder="Seleccione el tour"
        value={activities.filter(x => x.value === activityDescription.id)[0]}
        onChange={handleActivityChange}
        errors={errors}
        options={activities}
        innerRef={register({
          required: 'Seleccione el tour'
        })}
      />
    </>
  );
};

export default React.memo(TourForm);
