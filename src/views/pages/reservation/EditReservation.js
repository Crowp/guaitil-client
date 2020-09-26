import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormSteps from './components/edit/FormEditSteps';
import Section from '../../components/common/Section';
import ReservationProvider from '../../providers/ReservationProvider';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import ReservationAction from '../../../stores/reservation/ReservationAction';
import { hasErrors, selectRawErrors } from '../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../stores/error/ErrorAction';
import { isIterableArray } from '../../../template/helpers/utils';

const EditReservation = ({
  match: {
    params: { id }
  }
}) => {
  const [reservation, setReservation] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { reservations } = useSelector(state => state);
  const isRequesting = useSelector(state => selectRequesting(state, [ReservationAction.REQUEST_RESERVATION_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [ReservationAction.REQUEST_RESERVATION_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [ReservationAction.REQUEST_RESERVATION_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(reservation).length;

  useEffect(() => {
    if (isIterableArray(reservations)) {
      const [reservationEdit] = reservations.filter(rservation => rservation.id === Number(id));
      setReservation(reservationEdit);
    } else {
      dispatch(ReservationAction.getReservationById(id));
    }
  }, [reservations, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/reservations');
      dispatch(ErrorAction.removeById(errors[ReservationAction.REQUEST_REQUEST_LOCAL_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, isEmptyObject, errors]);

  return isRequesting || isEmptyObject ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ReservationProvider defultReservation={reservation}>
            <FormSteps />
          </ReservationProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditReservation;
