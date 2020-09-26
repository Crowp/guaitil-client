import React from 'react';

import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

const LandingRightSideNavItem = () => {
  return (
    <Nav navbar className="ml-auto">
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="/authentication/login">
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default LandingRightSideNavItem;
