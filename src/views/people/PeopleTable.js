import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup } from 'reactstrap';
import FalconCardHeader from '../components/common/FalconCardHeader';
import ButtonIcon from '../components/common/ButtonIcon';
import { Table } from '../components/tables';
import { EmailFormatter, PhoneFormatter, ActionFormatter } from '../components/tables/formatters';
import customers from '../../template/data/e-commerce/customers';

const columns = [
  {
    dataField: 'name',

    text: 'Nombre',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'email',
    headerClasses: 'border-0',
    text: 'Primer Apellido',
    classes: 'border-0 py-2 align-middle',
    formatter: EmailFormatter,
    sort: true
  },
  {
    dataField: 'phone',
    headerClasses: 'border-0',
    text: 'Segundo Apellido',
    classes: 'border-0 py-2 align-middle',
    formatter: PhoneFormatter,
    sort: true
  },
  {
    dataField: 'address',
    headerClasses: 'border-0',
    text: 'telefono',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'joined',
    headerClasses: 'border-0',
    text: 'Email',
    classes: 'border-0 py-2 align-middle',
    sort: true,
    align: 'right',
    headerAlign: 'right'
  },
  {
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionFormatter,
    align: 'right'
  }
];

const PeopleTable = ({ people }) => {
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: customers.length
  };
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Personas" light={false}>
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
          <Fragment>
            <ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
              New
            </ButtonIcon>
            <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
              Filter
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon>
          </Fragment>
        )}
      </FalconCardHeader>
      <CardBody className="p-0">
        <Table reference={table} options={options} columns={columns} items={people} onSelect={onSelect} />
      </CardBody>
    </Card>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.array.isRequired
};

export default PeopleTable;
