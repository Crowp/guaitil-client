import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import '../../../template/assets/styles-css/style-landing/landing.css';
import { RouteMap } from '../../../constants';

const NavbarTopDropDownMenus = ({ setNavbarCollapsed }) => {
  return (
    <>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.root()}>
          Inicio
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.gallery()}>
          Galería
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.workshops()}>
          Talleres
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.kitchens()}>
          Cocinas
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.lodging()}>
          Hospedaje
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active tag={Link} onClick={() => setNavbarCollapsed(true)} to={RouteMap.Home.activities()}>
          Actividades
        </NavLink>
      </NavItem>
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
