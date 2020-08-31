import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup, Modal } from 'reactstrap';
import FalconCardHeader from '../components/common/FalconCardHeader';
import ButtonIcon from '../components/common/ButtonIcon';
import { Table } from '../components/tables';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PhoneFormatter, ActionFormatter } from '../components/tables/formatters';

const columnsDefault = (onEditCell, onDeleteCell) => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'name',

    text: 'Nombre',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'description',

    text: 'Descripción',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'address',
    text: 'Direccion',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'activityType',
    text: 'Tipo',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionFormatter(onEditCell, onDeleteCell),
    align: 'right'
  }
];

const ActivityTable = ({ activities, title, all = false }) => {
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    console.log(id);
  };

  const onEditCell = id => {
    console.log(id);
    // history.push(`people/edit/${id}`);
  };

  let columns = columnsDefault(onEditCell, onDeleteCell);
  if (!all) {
    columns = columns.filter(column => column.dataField !== 'activityType');
  }

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: activities.length
  };
  return (
    <Card className="mb-3">
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
          <Fragment>
            <ButtonIcon
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
              onClick={() => history.push('/activities/create')}
            >
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
        <Table reference={table} options={options} columns={columns} items={activities} onSelect={onSelect} />
      </CardBody>
    </Card>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.array.isRequired,
  title: PropTypes.string
};

ActivityTable.defaultProps = {
  title: 'Actividades'
};

export default ActivityTable;
