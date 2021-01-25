import React, { useContext, useEffect } from 'react';
import ActivityAction from '../../../../../../../stores/activity/ActivityAction';
import { selectActiviyToOptions } from '../../../../../../../selectors/activity/ActivitySelector';
import { useSelector, useDispatch } from 'react-redux';
import { ReservationContext } from '../../../../../../context/index';
import { SelectInputForm } from '../../../../../../components/forms/inputs';

const TourForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { reservation, handleActivityChange } = useContext(ReservationContext);

  const { activity } = reservation;

  const activities = useSelector(selectActiviyToOptions);

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  return (
    <>
      <SelectInputForm
        type="select"
        label="Seleccione el tour"
        name="activity"
        id="activity"
        placeholder="Seleccione el tour"
        value={activities.filter(x => x.value === activity.id)[0]}
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
