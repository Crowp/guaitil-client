import React, { useContext } from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bg1 from '../../assets/img/generic/bg-1.jpg';
import dashboard from '../../assets/img/generic/dashboard-alt-light.png';
import dashboardDark from '../../assets/img/generic/dashboard-alt-dark.png';

import Section from '../common/Section';
import AppContext from '../../context/Context';

const Banner = () => {
  const { isDark } = useContext(AppContext);
  return (
    <Section className="py-0 overflow-hidden" image={bg1} position="center bottom" overlay>
      <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <Col md={11} lg={8} xl={5} className="pb-7 pb-xl-9 text-center text-xl-left">
          <h1 className="lead text-white opacity-75">Descubriendo Guaitil!</h1>
          <h1 className="text-white font-weight-light">
            <Typed
              strings={['Naturaleza', 'Armonía', 'Entretenimiento', 'Liberación de estrés']}
              typeSpeed={40}
              backSpeed={50}
              className="font-weight-bold pl-2"
              loop
            />
            <br />
          </h1>
        </Col>
      </Row>
    </Section>
  );
};

export default Banner;
