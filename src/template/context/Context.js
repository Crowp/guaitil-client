import { createContext } from 'react';

const AppContext = createContext({
  isFluid: false,
  isRTL: false,
  isDark: false,
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false,
  isTopNav: false
});

export default AppContext;
