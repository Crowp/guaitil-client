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
        <NavLink tag={Link} to="/">
          <FontAwesomeIcon icon="chart-pie" id="dashboardTooltip" className={`d-none d-${breakpoint}-inline-block`} />
          <UncontrolledTooltip placement="bottom" target="dashboardTooltip">
            Dashboard
          </UncontrolledTooltip>
          <span className={`d-${breakpoint}-none`}>Dashboard</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/documentation">
          <FontAwesomeIcon icon="book" id="documentationTooltip" className={`d-none d-${breakpoint}-inline-block`} />
          <UncontrolledTooltip placement="bottom" target="documentationTooltip">
            Documentación
          </UncontrolledTooltip>
          <span className={`d-${breakpoint}-none`}>Documentación</span>
        </NavLink>
        <NavLink tag={Link} to="#!" onClick={() => setShowRegistrationModal(!showRegistrationModal)}>
          Register
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default LandingRightSideNavItem;
