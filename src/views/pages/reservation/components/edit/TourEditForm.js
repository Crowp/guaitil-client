import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../../components/WizardInput';
import TourAction from '../../../../../stores/tour/TourAction';
import Select from 'react-select';
import { selectToursOptions } from '../../../../../selectors/tour/TourSelector';
import { useSelector, useDispatch } from 'react-redux';
import { ReservationContext } from '../../../../context/index';

const TourEditForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { handleInputChangeReservation } = useContext(ReservationContext);

  const [tourId, setTourId] = useState('');

  const tours = useSelector(selectToursOptions);

  const tourObjetive = useSelector(state => state.tours);

  useEffect(() => {
    dispatch(TourAction.getTours());
  }, [dispatch]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione el tour"
        placeholder="Seleccione el tour"
        tag={Select}
        name="tourId"
        id="tourId"
        value={tours.filter(x => x.value === tourId)[0]}
        onChange={({ value = '' }) => {
          setTourId(value);
          const [tourSelected] = tourObjetive.filter(x => x.id === value);
          handleInputChangeReservation({
            name: 'tour',
            value: tourSelected
          });
        }}
        innerRef={register({
          required: 'Seleccione el tour'
        })}
        errors={errors}
        options={tours}
        isSearchable
      />
    </>
  );
};

export default React.memo(TourEditForm);
