import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import handleNavbarTransparency from '../../helpers/handleNavbarTransparency';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import LandingRightSideNavItem from './LandingRightSideNavItem';
import { topNavbarBreakpoint } from '../../config';
import '../../../template/assets/styles-css/style-FooterStandard/footer.css';

const NavbarStandard = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleNavbarTransparency);
    return () => window.removeEventListener('scroll', handleNavbarTransparency);
  }, []);

  return (
    <Navbar
      dark
      fixed="top"
      expand={topNavbarBreakpoint}
      className={classNames('navbar-standard navbar-theme', {
        'bg-dark': !navbarCollapsed
      })}
    >
      <Container>
        <NavbarBrand className="text-white" tag={Link} to="/">
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
