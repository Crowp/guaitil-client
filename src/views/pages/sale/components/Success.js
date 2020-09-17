import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Spinner } from 'reactstrap';
import Lottie from 'react-lottie';
import animationData from '../../../components/lottie/celebration.json';
import warningLight from '../../../components/lottie/warning-light.json';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { hasErrors, selectErrorText } from '../../../../selectors/error/ErrorSelector';
import SaleAction from '../../../../stores/sale/SaleAction';

const Success = ({ setStep, title = '' }) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  const isRequesting = useSelector(state =>
    selectRequesting(state, [SaleAction.REQUEST_SALE_CREATE, SaleAction.REQUEST_SALE_UPDATE])
  );
  const exitsErrors = useSelector(state =>
    hasErrors(state, [SaleAction.REQUEST_SALE_CREATE_FINISHED, SaleAction.REQUEST_SALE_UPDATE_FINISHED])
  );
  const errorTexts = useSelector(state =>
    selectErrorText(state, [SaleAction.REQUEST_SALE_CREATE_FINISHED, SaleAction.REQUEST_SALE_UPDATE_FINISHED])
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
    history.push(`/member/sale`);
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
        <h4 className="mb-1">{error ? 'Ah ocurrido un error' : title}</h4>
        <p className="fs-0">
          {error ? 'Puedes devolverte para ver la información' : 'Ahora puedes ir a ver las ventas'}{' '}
        </p>
        <Button color="primary" className="px-5 my-3 text-white" onClick={emptyData}>
          {error ? 'Volver' : 'Ir a ventas'}
        </Button>
      </Col>
    </Row>
  );
};

export default Success;
