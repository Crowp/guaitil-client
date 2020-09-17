import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Section from '../common/Section';
import IconGroup from '../common/icon/IconGroup';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconList, menuList1 } from '../../data/footer';
import { animateScroll } from 'react-scroll';
import { version } from '../../config';
import '../../../template/assets/styles-css/style-landing/landing.css';

const FooterTitle = ({ children }) => <h5 className="text-uppercase text-white opacity-85 mb-3">{children}</h5>;

FooterTitle.propTypes = { children: PropTypes.node.isRequired };

const FooterList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map(({ title, to }, index) => (
      <li className="mb-1" key={index}>
        <Link className="text-600" to={to}>
          {title}
        </Link>
      </li>
    ))}
  </ul>
);

FooterList.propTypes = { list: PropTypes.array.isRequired };

const FooterBlogList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map((blog, index) => (
      <li key={index}>
        <p className="text-600 opacity-50">
          <Link className="text-600" to="#!">
            {blog.title}
          </Link>
        </p>
        <p className="text-600 opacity-50">{blog.date}</p>
        <p className="font-weight-normal landing-text">{blog.read}</p>
      </li>
    ))}
  </ul>
);
//{blog.read} read {blog.star && <span dangerouslySetInnerHTML={createMarkup('&starf;')} />
FooterBlogList.propTypes = { list: PropTypes.array.isRequired };

const FooterStandard = () => {
  return (
    <Fragment>
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
              <a
                className="text-white opacity-85"
                href="https://themewagon.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            </p>
          </Col>
          <Col xs={12} sm="auto">
            <p className="mb-0 text-600">v{version}</p>
          </Col>
        </Row>
      </Section>
    </Fragment>
  );
};

export default FooterStandard;
