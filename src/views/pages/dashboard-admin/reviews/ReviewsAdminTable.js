import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup } from 'reactstrap';
import FalconCardHeader from '../../../../template/components/common/FalconCardHeader';
import ButtonIcon from '../../../../template/components/common/ButtonIcon';
import { Table } from '../../../components/tables';
import { useHistory } from 'react-router-dom';
import ActionOpenFormatter from './components/formatters/ActionOpenFormatter';

import { BadgeFormatter } from '../../../components/table/formatters';

const columns = onOpenCell => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'reviewDate',

    text: 'Última revisión',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'state',

    text: 'Estado',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: BadgeFormatter,
    sort: true
  },
  {
    dataField: 'productName',
    text: 'Nombre del producto',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: '',
    text: 'Acciones',
    headerClasses: 'border-0 text-center',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionOpenFormatter(onOpenCell),
    align: 'center'
  }
];

const ReviewsTable = ({ reviews }) => {
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();

  const onOpenCell = id => {
    history.push(`/admin/reviews/${id}`);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: reviews.length
  };
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Revisiones" light={false}>
        {isSelected ? (
          <InputGroup size="sm" className="input-group input-group-sm">
            <CustomInput type="select" id="bulk-select">
              <option>Bulk actions</option>
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
              onClick={() => history.push('reservations/create')}
            >
              Crear
            </ButtonIcon>
            <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
              Filtrar
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Exportar
            </ButtonIcon>
          </Fragment>
        )}
      </FalconCardHeader>
      <CardBody className="p-0">
        <Table reference={table} options={options} columns={columns(onOpenCell)} items={reviews} onSelect={onSelect} />
      </CardBody>
    </Card>
  );
};

ReviewsTable.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default React.memo(ReviewsTable);
