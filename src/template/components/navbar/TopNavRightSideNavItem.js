import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';
import SettingsAnimatedIcon from './SettingsAnimatedIcon';

const TopNavRightSideNavItem = () => {
  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      <NavItem>
        <SettingsAnimatedIcon />
      </NavItem>
      <NotificationDropdown />
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
