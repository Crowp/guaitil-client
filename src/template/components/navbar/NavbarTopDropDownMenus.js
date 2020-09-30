import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import '../../../template/assets/styles-css/style-landing/landing.css';

const NavbarTopDropDownMenus = () => {
  return (
    <>
      <NavItem>
        <NavLink active tag={Link} to="/">
          Inicio
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} to="/talleres">
          Talleres
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} to="/cocinas">
          Cocinas
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} to="/alojamientos">
          Hospedaje
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} to="/actividades">
          Actividades
        </NavLink>
      </NavItem>
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
