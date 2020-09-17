import React from 'react';
import Badge from 'reactstrap/es/Badge';
import { ReviewStateEnum } from '../../../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BadgeFormatter = status => {
  let color = '';
  let icon = '';
  let text = '';
  switch (status) {
    case ReviewStateEnum.Accept:
      color = 'success';
      icon = 'check';
      text = 'Aprobado';
      break;
    case ReviewStateEnum.Rejected:
      color = 'secondary';
      icon = 'ban';
      text = 'Rechazado';
      break;
    default:
      color = 'warning';
      icon = 'stream';
      text = 'Procesando';
  }
  return (
    <Badge color={`soft-${color}`} className="rounded-capsule">
      {text}
      <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
    </Badge>
  );
};

export default BadgeFormatter;
