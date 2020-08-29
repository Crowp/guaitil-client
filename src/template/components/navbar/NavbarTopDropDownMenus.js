import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

const NavbarTopDropDownMenus = () => {
  return (
    <>
      <NavItem>
        <NavLink tag={Link} to="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="#!">
          Talleres
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="#!">
          Cocinas
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="#!">
          Actividades
        </NavLink>
      </NavItem>
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
