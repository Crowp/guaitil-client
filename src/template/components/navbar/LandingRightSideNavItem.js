import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { RouteMap } from '../../../constants';

const LandingRightSideNavItem = () => {
  return (
    <Nav navbar className="ml-auto">
      <NavItem>
        <NavLink active tag={Link} to={RouteMap.Auth.login()} style={{ padding: 0 }}>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default LandingRightSideNavItem;
