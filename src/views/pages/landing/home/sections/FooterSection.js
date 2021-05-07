import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animateScroll } from 'react-scroll';
import { version } from '@/template/config';
import Flex from '../../../../../template/components/common/Flex';
import ButtonIcon from '../../../../../template/components/common/ButtonIcon';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import Section from '../../../../../template/components/common/Section';
import FooterTitle from '../../../../../template/components/landing/footer/FooterTitle';
import FooterBlogList from '../../../../../template/components/landing/footer/FooterBlogList';
import { menuList1 } from '../../../../../template/data/footer';
import '@/template/assets/styles-css/style-landing/landing.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { RouteMap } from '../../../../../constants';
import UnaLogo from '../../../../../template/assets/img/logos/una.png';

const Footer = () => {
  const history = useHistory();
  return (
    <>
      <Section fluid className="size-footer pb-4 landing-color">
        <div
          className="position-absolute btn-back-to-top cursor-pointer landing-color chevron-position"
          onClick={animateScroll.scrollToTop}
        >
          <FontAwesomeIcon icon="chevron-up" transform="rotate-45" className="text-600" />
        </div>
        <Row>
          <Col lg={2}>
            <FooterTitle>Misión</FooterTitle>
            <p className="font-weight-normal landing-text ">
              Brindar bienestar comunal, promoviendo el desarrollo integral de Guaitil
            </p>
          </Col>
          <Col lg={3}>
            <FooterTitle>Visión</FooterTitle>
            <p className="font-weight-normal landing-text ">
              Ser la Asociación de Desarrollo Integral líder en la promoción del desarrollo comunal, posicionando a
              Guaitil a nivel provincial como un punto de turismo rural cultural comunitario
            </p>
          </Col>
          <Col lg={3}>
            <FooterTitle>Contáctenos</FooterTitle>
            <FooterBlogList list={menuList1} />
          </Col>
          <Col lg={2}>
            <FooterTitle>Desarrolladores</FooterTitle>
            <p className="font-weight-normal landing-text ">
              Este proyecto está desarrollado por estudiantes de la Universidad Nacional de Costa Rica sede regional
              chorotega
            </p>
            <Flex justify="center" className="justify-content-sm-start">
              <ButtonIcon
                className="rounded-capsule mr-3 ml-3 mb-1"
                color="falcon-default"
                icon={faUsers}
                transform="shrink-3"
                onClick={() => history.push(RouteMap.Home.team())}
              >
                Ver equipo
              </ButtonIcon>
            </Flex>
          </Col>
          <Col lg={2} className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
            <img src={UnaLogo} alt="una" width="200" height="150" style={{ objectFit: 'cover' }} />
          </Col>
        </Row>
      </Section>
      <Section bg="dark" className="py-0 py-3 text-center fs--1">
        <Row className="justify-content-between">
          <Col xs={12} sm="auto">
            <p className="mb-0 text-600">
              Guaitil-Soft <span className="d-none d-sm-inline-block">| </span>
              <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
            </p>
          </Col>
          <Col xs={12} sm="auto">
            <p className="mb-0 text-600">v{version}</p>
          </Col>
        </Row>
      </Section>
    </>
  );
};

export default Footer;
