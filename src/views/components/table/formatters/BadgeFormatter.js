import React from 'react';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BadgeFormatter = status => {
  let color = '';
  let icon = '';
  let text = '';
  switch (status) {
    case 'Aprovado':
      color = 'success';
      icon = 'check';
      text = 'Aprobado';
      break;
    case 'Rechazado':
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
