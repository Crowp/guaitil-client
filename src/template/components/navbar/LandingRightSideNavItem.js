import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';

const breakpoint = 'lg';

const LandingRightSideNavItem = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <Nav navbar className="ml-auto">
      <NavItem>
        <NavLink tag={Link} to="#!" onClick={() => setShowRegistrationModal(!showRegistrationModal)}>
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default LandingRightSideNavItem;
