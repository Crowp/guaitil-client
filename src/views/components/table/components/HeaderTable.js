import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FalconCardHeader from '@/template/components/common/FalconCardHeader';
import ButtonIcon from '@/template/components/common/ButtonIcon';
import { useIsRequesting } from '../../../hooks';
import LocalAction from '../../../../stores/local/LocalAction';
import AuthAction from '../../../../stores/auth/AuthAction';
import MemberAction from '../../../../stores/member/MemberAction';
import ReservationAction from '../../../../stores/reservation/ReservationAction';
import SaleAction from '../../../../stores/sale/SaleAction';
import ProductAction from '../../../../stores/product/ProductAction';
import ActivityAction from '../../../../stores/activity/ActivityAction';

const HeaderTable = ({ actions, ...rest }) => (
  <FalconCardHeader {...rest} light={false}>
    {actions.map((item, index) => (
      <ButtonHeader {...item} key={`table-header-button-${index}`} />
    ))}
  </FalconCardHeader>
);

const ButtonHeader = ({ icon, text, onClick, color, children = [] }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return children.length === 0 ? (
    <ButtonIcon
      icon={icon}
      transform="shrink-3 down-2"
      color={color}
      size="sm"
      className="m-1 shadow-sm rounded"
      onClick={onClick}
    >
      {text}
    </ButtonIcon>
  ) : (
    <ButtonDropdownCustom
      isOpen={dropdownOpen}
      toggle={toggle}
      text={text}
      icon={icon}
      color={color}
      items={children}
    />
  );
};

const ButtonDropdownCustom = ({ isOpen, toggle, icon, color, items, text }) => {
  const isRequesting = useIsRequesting([
    LocalAction.REQUEST_LOCALS_REPORT_EXCEL,
    LocalAction.REQUEST_LOCALS_REPORT_PDF,
    AuthAction.REQUEST_AUTH_REPORT_EXCEL,
    AuthAction.REQUEST_AUTH_REPORT_PDF,
    MemberAction.REQUEST_MEMBERS_REPORT_EXCEL,
    MemberAction.REQUEST_MEMBERS_REPORT_PDF,
    LocalAction.REQUEST_LOCALS_REPORT_PDF,
    LocalAction.REQUEST_LOCALS_REPORT_EXCEL,
    ReservationAction.REQUEST_RESERVATION_PDF,
    ReservationAction.REQUEST_RESERVATION_EXCEL,
    SaleAction.REQUEST_SALE_REPORT_EXCEL,
    SaleAction.REQUEST_SALE_REPORT_PDF,
    ProductAction.REQUEST_PRODUCT_REPORT_PDF,
    ProductAction.REQUEST_PRODUCT_REPORT_EXCEL,
    ActivityAction.REQUEST_ACTIVITIES_REPORT_EXCEL,
    ActivityAction.REQUEST_ACTIVITIES_REPORT_PDF
  ]);
  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle} disabled={isRequesting}>
      <ButtonIcon
        tag={DropdownToggle}
        icon={icon}
        isRequesting={isRequesting}
        transform="shrink-3 down-2"
        color={color}
        size="sm"
        className="m-1 shadow-sm rounded"
        caret
      >
        {text}
      </ButtonIcon>
      <DropdownMenu>
        {items.map(({ text, onClick }, index) => (
          <DropdownItem key={`${text}-${index}asdf`} onClick={onClick}>
            {text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

HeaderTable.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      color: PropTypes.string
    })
  ).isRequired
};

export default HeaderTable;
