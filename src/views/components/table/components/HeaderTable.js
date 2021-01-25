import React from 'react';
import PropTypes from 'prop-types';
import { Button, CustomInput, InputGroup } from 'reactstrap';
import FalconCardHeader from '@/template/components/common/FalconCardHeader';
import ButtonIcon from '@/template/components/common/ButtonIcon';

const HeaderTable = ({ searchBarIsOpen, SearchBar, searchProps, isSelected, title, actions }) => (
  <FalconCardHeader title={title} light={false}>
    {isSelected ? (
      <InputGroup size="sm" className="input-group input-group-sm">
        <CustomInput type="select" id="bulk-select">
          <option>Bulk actions</option>
          <option value="Delete">Delete</option>
          <option value="Archive">Archive</option>
        </CustomInput>
        <Button color="falcon-default" size="sm" className="ml-2">
          Apply
        </Button>
      </InputGroup>
    ) : (
      actions.map(({ icon, text, onClick, color }, index) => (
        <ButtonIcon
          key={`table-header-button-${index}`}
          icon={icon}
          transform="shrink-3 down-2"
          color={color}
          size="sm"
          className="m-1 shadow-sm rounded"
          onClick={onClick}
        >
          {text}
        </ButtonIcon>
      ))
    )}
  </FalconCardHeader>
);

HeaderTable.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      color: PropTypes.string
    })
  ).isRequired
};

export default HeaderTable;
