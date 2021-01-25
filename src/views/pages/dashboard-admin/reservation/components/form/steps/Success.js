import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Spinner } from 'reactstrap';
import Lottie from 'react-lottie';
//import animationData from '../../../..../../components/lottie/celebration.json';
import animationData from '../../../..../../components/';
import warningLight from '../../../../components/lottie/warning-light.json';
import { selectRequesting } from '../../../../../../../selectors/requesting/RequestingSelector';
import { hasErrors, selectErrorText } from '../../../../../../../selectors/error/ErrorSelector';
import ReservationAction from '../../../../../../../stores/reservation/ReservationAction';

const Success = ({ setStep, title = '' }) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  const isRequesting = useSelector(state =>
    selectRequesting(state, [
      ReservationAction.REQUEST_RESERVATION_CREATE,
      ReservationAction.REQUEST_RESERVATION_UPDATE
    ])
  );
  const exitsErrors = useSelector(state =>
    hasErrors(state, [
      ReservationAction.REQUEST_RESERVATION_CREATE_FINISHED,
      ReservationAction.REQUEST_RESERVATION_UPDATE_FINISHED
    ])
  );
  const errorTexts = useSelector(state =>
    selectErrorText(state, [
      ReservationAction.REQUEST_RESERVATION_CREATE_FINISHED,
      ReservationAction.REQUEST_RESERVATION_UPDATE_FINISHED
    ])
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error ? warningLight : animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    if (exitsErrors) {
      setError(errorTexts);
    }
  }, [exitsErrors, errorTexts, isRequesting]);

  const emptyData = () => {
    history.push('/admin/reservations');
  };

  return isRequesting ? (
    <Row>
      <Col className="text-center">
        <Row className="min-vh-25 h-25">
          <Col className="d-flex justify-content-center align-items-center">
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
          </Col>
        </Row>
        <h4 className="mb-1">Procesando...</h4>
        <p className="fs-0">Espere un momento</p>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col className="text-center">
        <div className="wizard-lottie-wrapper" style={error ? { paddingTop: 125, paddingBottom: 20 } : {}}>
          <div className="wizard-lottie mx-auto" style={error ? { width: 200, height: 200 } : {}}>
            <Lottie options={defaultOptions} />
          </div>
        </div>
        <h4 className="mb-1">{error ? 'Ha ocurrido un error' : title}</h4>
        <p className="fs-0">
          {error ? 'Puedes devolverte para ver la información' : 'Ahora pueder ir a ver las reservaciones'}{' '}
        </p>
        <Button color="primary" className="px-5 my-3 text-white" onClick={emptyData}>
          Ir a reservaciones
        </Button>
      </Col>
    </Row>
  );
};

export default React.memo(Success);
