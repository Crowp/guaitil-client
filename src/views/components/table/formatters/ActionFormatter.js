import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ActionFormatter = (onEditCell, onDeleteCell, onShowInfoCell) => (dataField, { id, ...rest }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon={faEllipsisH} className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => onEditCell(id)}>Editar</DropdownItem>
        <DropdownItem onClick={() => onShowInfoCell(id)} className="border py-2">
          Ver Informacion
        </DropdownItem>
        <DropdownItem onClick={() => onDeleteCell(id)} className="text-danger">
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export default ActionFormatter;
