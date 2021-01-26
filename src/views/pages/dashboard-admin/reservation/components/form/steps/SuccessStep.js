import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import ReservationAction from '../../../../../../../stores/reservation/ReservationAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(
    () => [ReservationAction.REQUEST_RESERVATION_CREATE, ReservationAction.REQUEST_RESERVATION_UPDATE],
    []
  );
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Reservation.root()}
      description="Ir a reservaciones"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
