/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TeamItem = ({ name, rol, img, socialNetworks = [] }) => {
  return (
    <Col lg={4} className="mb-4">
      <Row>
        <Col md={12}>
          <img src={img} alt={name} className="img-fluid" />
        </Col>
        <Col md={12}>
          <div className="pt-2">
            <h5 className="mt-4 font-weight-medium mb-0">{name}</h5>
            <h6 className="subtitle">{rol}</h6>
            <p>You can relay on our amazing features list and also our customer services will be great experience.</p>
            <ul className="list-inline">
              {socialNetworks.length &&
                socialNetworks.map((item, i) => (
                  <li className="list-inline-item" key={`social-${i}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none d-block px-1"
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Col>
  );
};
