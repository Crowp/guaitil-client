import React from 'react';
import { Button } from 'reactstrap';

const ActionOpenFormatter = onOpenCell => (dataField, { id }) => {
  return (
    <Button color="info" outline onClick={() => onOpenCell(id)}>
      Ver
    </Button>
  );
};
export default ActionOpenFormatter;
