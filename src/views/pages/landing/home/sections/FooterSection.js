import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animateScroll } from 'react-scroll';
import { version } from '@/template/config';

import Section from '../../../../../template/components/common/Section';
import FooterTitle from '../../../../../template/components/landing/footer/FooterTitle';
import FooterBlogList from '../../../../../template/components/landing/footer/FooterBlogList';
import { iconList, menuList1 } from '../../../../../template/data/footer';
import IconGroup from '../../../../../template/components/common/icon/IconGroup';
import '@/template/assets/styles-css/style-landing/landing.css';

const Footer = () => {
  return (
    <>
      <Section className="size-footer pb-4 landing-color">
        <div
          className="position-absolute btn-back-to-top cursor-pointer landing-color chevron-position"
          onClick={animateScroll.scrollToTop}
        >
          <FontAwesomeIcon icon="chevron-up" transform="rotate-45" className="text-600" />
        </div>
        <Row>
          <Col lg={4}>
            <FooterTitle>Misión</FooterTitle>
            <p className="font-weight-normal landing-text ">
              Brindar bienestar comunal, promoviendo el desarrollo integral de Guaitil
            </p>
          </Col>
          <Col lg={4}>
            <FooterTitle>Visión</FooterTitle>
            <p className="font-weight-normal landing-text ">
              Ser la Asociación de Desarrollo Integral líder en la promoción del desarrollo comunal, posicionando a
              Guaitil a nivel provincial como un punto de turismo rural cultural comunitario
            </p>
          </Col>
          <Col className="pl-lg-6 pl-xl-8">
            <FooterTitle>Contáctenos</FooterTitle>
            <FooterBlogList list={menuList1} />
            <IconGroup className="mt-4" icons={iconList} />
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
