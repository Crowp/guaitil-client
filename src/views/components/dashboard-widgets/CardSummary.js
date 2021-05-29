import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Background from '../../../template/components/common/Background';
import corner1 from '../../../template/assets/img/illustrations/corner-1.png';
import corner2 from '../../../template/assets/img/illustrations/corner-2.png';
import corner3 from '../../../template/assets/img/illustrations/corner-3.png';

const getImage = color => {
  switch (color) {
    case 'warning':
      return corner1;
    case 'info':
      return corner2;
    case 'success':
      return corner3;
    default:
      return corner1;
  }
};

const getContentClassNames = color => {
  const contentClassNames = `display-4 fs-4 mb-2 font-weight-normal text-sans-serif`;
  if (color === 'success') return contentClassNames;
  return `${contentClassNames} text-${color}`;
};

const CardSummary = ({ title, linkText, to, color, children, isPrincipal, bgColor, titleColor, iconCard }) => {
  return (
    <Card className={`mb-3 overflow-hidden ${bgColor}`} style={{ minWidth: '12rem' }}>
      <Background image={getImage(color)} className="bg-card" />
      <CardBody className="position-relative">
        <h6 className={`${titleColor}`}>{title}</h6>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
          <div style={{ display: 'inline-block' }} className={getContentClassNames(color)}>
            {children}
          </div>
          <div style={{ display: 'inline-block' }}>
            {iconCard && (
              <FontAwesomeIcon
                icon={iconCard}
                transform="shrink--30"
                className="text-100 mr-6 mt-2"
                id="weeklySalesTooltip"
              />
            )}
          </div>
        </div>
        {isPrincipal && (
          <Link className={`font-weight-semi-bold fs--1 text-nowrap ${titleColor}`} to={to}>
            {linkText}
            <FontAwesomeIcon icon="angle-right" transform="down-1.5" className="ml-1" />
          </Link>
        )}
      </CardBody>
    </Card>
  );
};

CardSummary.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node
};

CardSummary.defaultProps = {
  to: '#!',
  color: 'primary'
};

export default CardSummary;
