import React from 'react';
import { Button } from 'reactstrap';
import { ReviewStateEnum } from '../../../../../../constants';

const ActionOpenFormatter = onOpenCell => (dataField, { id, state }) => {
  console.log(onOpenCell);
  console.log(dataField);
  return (
    <Button color="info" outline disabled={state === ReviewStateEnum.InProgress} onClick={() => onOpenCell(id)}>
      Ver
    </Button>
  );
};
export default ActionOpenFormatter;
