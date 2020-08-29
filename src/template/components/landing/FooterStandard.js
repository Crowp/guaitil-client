import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import createMarkup from '../../helpers/createMarkup';
import Section from '../common/Section';
import IconGroup from '../common/icon/IconGroup';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blogPostList, iconList, menuList1, menuList2 } from '../../data/footer';
import { animateScroll } from 'react-scroll';
import { version } from '../../config';

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
        <p className="text-600 opacity-50">{blog.read}</p>
      </li>
    ))}
  </ul>
);
//{blog.read} read {blog.star && <span dangerouslySetInnerHTML={createMarkup('&starf;')} />
FooterBlogList.propTypes = { list: PropTypes.array.isRequired };

const FooterStandard = () => {
  return (
    <Fragment>
      <Section bg="dark" className="pt-8 pb-4">
        <div className="position-absolute btn-back-to-top cursor-pointer bg-dark" onClick={animateScroll.scrollToTop}>
          <FontAwesomeIcon icon="chevron-up" transform="rotate-45" className="text-600" />
        </div>
        <Row>
          <Col lg={4}>
            <FooterTitle>Misión</FooterTitle>
            <p className="text-600"> lorem ipsum</p>
            <FooterTitle>Visión</FooterTitle>
            <p className="text-600">lorem ipsum</p>
            <IconGroup className="mt-4" icons={iconList} />
          </Col>
          <Col className="pl-lg-6 pl-xl-8">
            <Row className="mt-5 mt-lg-0">
              <Col className="mt-5 mt-md-0">
                <FooterTitle>Valores que nos caracterizan</FooterTitle>
                <FooterBlogList list={menuList1} />
              </Col>
              <Col className="mt-5 mt-md-0">
                <FooterTitle>Contáctenos</FooterTitle>
                <FooterBlogList list={blogPostList} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
      <Section bg="dark" className="py-0 py-3 border-top border-600 opacity-25 text-center fs--1">
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
