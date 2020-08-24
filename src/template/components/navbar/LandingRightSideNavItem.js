import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Card, CardBody, Modal, ModalBody, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';

import Login from '../auth/basic/Login';
import Registration from '../auth/basic/Registration';
import NavbarDropdown from './NavbarDropdown';

const breakpoint = 'lg';

const LandingRightSideNavItem = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <Nav navbar className="ml-auto">
      <NavbarDropdown title="Login" right>
        <Card className="navbar-card-login shadow-none">
          <CardBody className="fs--1 font-weight-normal p-4">
            <Login />
          </CardBody>
        </Card>
      </NavbarDropdown>
    </Nav>
  );
};

export default LandingRightSideNavItem;
