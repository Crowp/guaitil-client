import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import '../../../template/assets/styles-css/style-landing/landing.css';

const NavbarTopDropDownMenus = () => {
  return (
    <>
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="/">
          Inicio
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="/talleres">
          Talleres
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="/cocinas">
          Cocinas
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="/alojamientos">
          Hospedaje
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink style={{ color: 'white', letterSpacing: '.5px' }} tag={Link} to="#!">
          Actividades
        </NavLink>
      </NavItem>
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
