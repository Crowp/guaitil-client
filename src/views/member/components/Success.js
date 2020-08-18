import React, { Fragment, useContext } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Lottie from 'react-lottie';
import animationData from './lottie/celebration.json';
import { MemberContext, LocalContext } from '../../context';
import { useHistory } from 'react-router-dom';

const Success = ({ setStep }) => {
  const { setMember } = useContext(MemberContext);
  const { setLocal } = useContext(LocalContext);
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const emptyData = () => {
    setStep(1);
    setMember({});
    setLocal({});
    history.push('/people');
  };

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <div className="wizard-lottie-wrapper">
            <div className="wizard-lottie mx-auto">
              <Lottie options={defaultOptions} />
            </div>
          </div>
          <h4 className="mb-1">Se ha creado un miembro!</h4>
          <p className="fs-0">Ahora pueder ir a ver los miembros</p>
          <Button color="primary" className="px-5 my-3 text-white" onClick={emptyData}>
            Ir a Miembros
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Success;
