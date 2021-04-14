import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavItem, NavLink } from 'reactstrap';

const StepsHeaderItem = ({ activeStep, order, onGoBack = () => {}, icon, title }) => {
  return (
    <NavItem>
      <NavLink
        className={classNames('font-weight-semi-bold d-none d-sm-block', {
          'done cursor-pointer': activeStep > order,
          active: activeStep === order
        })}
        onClick={() => onGoBack(order)}
      >
        <span className="nav-item-circle-parent">
          <span className="nav-item-circle">
            <FontAwesomeIcon icon={icon} />
          </span>
        </span>
        <span className="d-none d-md-block mt-1 fs--1">{title}</span>
      </NavLink>
    </NavItem>
  );
};

StepsHeaderItem.propTypes = {
  activeStep: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  onGoBack: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default StepsHeaderItem;
