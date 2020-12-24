import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CustomInput,
  InputGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap';
import FalconCardHeader from '../../../template/components/common/FalconCardHeader';
import ButtonIcon from '../../../template/components/common/ButtonIcon';
import { Table } from '../../components/tables';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionFormatter } from '../../components/tables/formatters';
import ActivityAction from '../../../stores/activity/ActivityAction';

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
  const [idActivity, setIdActivity] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    setIdActivity(id);
  };

  const onDeleteModal = () => {
    dispatch(ActivityAction.deleteActivity(idActivity));
    setIdActivity(false);
  };

  const onEditCell = id => {
    history.push(`activities/edit/${id}`);
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
    <>
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
                onClick={() => history.push('/admin/activities/create')}
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
          <Table reference={table} options={options} columns={columns} items={activities} onSelect={onSelect} />
        </CardBody>
      </Card>
      <Modal isOpen={!!idActivity} toggle={() => setIdActivity(false)}>
        <ModalHeader>Eliminar Multimedia</ModalHeader>
        <ModalBody>¿Desea eliminar este archivo multimedia?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setIdActivity(false)}>
            Cancelar
          </Button>
          <Button onClick={onDeleteModal}>Eliminar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.array.isRequired,
  title: PropTypes.string
};

ActivityTable.defaultProps = {
  title: 'Actividades'
};

export default React.memo(ActivityTable);
