import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActionFormatter = (onEditCell, onDeleteCell) => (dataField, { id, ...rest }) => {
  console.log(rest);
  console.log(dataField);
  return (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => onEditCell(id)}>Edit</DropdownItem>
        <DropdownItem onClick={() => onDeleteCell(id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ActionFormatter;
