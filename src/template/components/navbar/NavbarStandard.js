import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import handleNavbarTransparency from '../../helpers/handleNavbarTransparency';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import LandingRightSideNavItem from './LandingRightSideNavItem';
import { topNavbarBreakpoint } from '../../config';
import '../../../template/assets/styles-css/style-landing/landing.css';

const NavbarStandard = ({ hasColor }) => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  useEffect(() => {
    if (!hasColor) {
      window.addEventListener('scroll', handleNavbarTransparency);
    }
    return () => window.removeEventListener('scroll', handleNavbarTransparency);
  }, []);

  return (
    <Navbar
      dark
      fixed="top"
      style={hasColor && { backgroundColor: 'rgba(166, 40, 28, 1)' }}
      expand={topNavbarBreakpoint}
      className={classNames('navbar-standard navbar-theme', {
        'landing-color': !navbarCollapsed
      })}
    >
      <Container>
        <NavbarBrand className="text-white landing-text" tag={Link} to="/">
          Guaitil
        </NavbarBrand>
        <NavbarToggler onClick={() => setNavbarCollapsed(!navbarCollapsed)} />
        <Collapse isOpen={!navbarCollapsed} navbar className="scrollbar ">
          <Nav navbar>
            <NavbarTopDropDownMenus setNavbarCollapsed={setNavbarCollapsed} />
          </Nav>
          <LandingRightSideNavItem />
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarStandard;
