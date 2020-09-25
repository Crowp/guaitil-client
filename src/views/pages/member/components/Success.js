import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Spinner } from 'reactstrap';
import Lottie from 'react-lottie';
import animationData from '../../../components/lottie/celebration.json';
import warningLight from '../../../components/lottie/warning-light.json';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { hasErrors, selectErrorText } from '../../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import MemberAction from '../../../../stores/member/MemberAction';

const Success = ({ setStep, title = '' }) => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const isRequesting = useSelector(state =>
    selectRequesting(state, [
      MemberAction.REQUEST_MEMBER_CREATE,
      MemberAction.REQUEST_MEMBER_UPDATE,
      MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL
    ])
  );
  const exitsErrors = useSelector(state =>
    hasErrors(state, [
      MemberAction.REQUEST_MEMBER_CREATE_FINISHED,
      MemberAction.REQUEST_MEMBER_UPDATE_FINISHED,
      MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL_FINISHED
    ])
  );
  const errorTexts = useSelector(state =>
    selectErrorText(state, [
      MemberAction.REQUEST_MEMBER_CREATE_FINISHED,
      MemberAction.REQUEST_MEMBER_UPDATE_FINISHED,
      MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL_FINISHED
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
      dispatch(ErrorAction.clearAll());
    }
  }, [exitsErrors, errorTexts, isRequesting, dispatch]);

  const emptyData = () => {
    history.push('/admin/members');
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
        <p className="fs-0">Espere unos momentos</p>
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
          {error ? 'Puedes devolverte para ver la información' : 'Ahora pueder ir a ver los miembros'}{' '}
        </p>
        <Button color="primary" className="px-5 my-3 text-white" onClick={emptyData}>
          Ir a Miembros
        </Button>
      </Col>
    </Row>
  );
};

export default Success;
