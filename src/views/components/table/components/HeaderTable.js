import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FalconCardHeader from '@/template/components/common/FalconCardHeader';
import ButtonIcon from '@/template/components/common/ButtonIcon';

const HeaderTable = ({ searchBarIsOpen, SearchBar, searchProps, title, actions }) => (
  <FalconCardHeader title={title} light={false}>
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
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <ButtonIcon
        tag={DropdownToggle}
        icon={icon}
        transform="shrink-3 down-2"
        color={color}
        size="sm"
        className="m-1 shadow-sm rounded"
        caret
      >
        {text}
      </ButtonIcon>
      <DropdownMenu>
        {children.map(({ text, onClick }, index) => (
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
