import React from 'react';
import { Button } from 'reactstrap';

const ActionOpenFormatter = onOpenCell => (dataField, { id }) => {
  console.log(onOpenCell);
  return (
    <Button color="info" outline onClick={() => onOpenCell(id)}>
      Ver
    </Button>
  );
};
export default ActionOpenFormatter;
