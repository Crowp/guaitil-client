import React, { useContext } from 'react';
import Typed from 'react-typed';
import { Row, Col } from 'reactstrap';
import bg1 from '../../assets/img/background/img1.jpg';
import '../../../template/assets/styles-css/style-landing/landing.css';
import Section from '../common/Section';
import AppContext from '../../context/Context';

const Banner = () => {
  const { isDark } = useContext(AppContext);
  return (
    <Section className="py-0 overflow-hidden" image={bg1} position="center bottom " overlay>
      <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <Col md={11} lg={8} xl={4} className="pb-7 pb-xl-9 text-center text-xl-left">
          <h1 className="text-white font-weight-light">
            Ver
            <Typed
              strings={['comidas', 'artesanías', 'tours', ' más']}
              typeSpeed={40}
              backSpeed={50}
              className="font-weight-bold pl-2"
              loop
            />
          </h1>
          <p className="lead text-white opacity-75">
            Explora las diferentes experiencias que te ofrece la comunidad Guaitil
          </p>
        </Col>
      </Row>
    </Section>
  );
};

export default Banner;
