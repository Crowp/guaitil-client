import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup, Modal } from 'reactstrap';
import FalconCardHeader from '../components/common/FalconCardHeader';
import ButtonIcon from '../components/common/ButtonIcon';
import { Table } from '../components/tables';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionFormatter } from '../components/tables/formatters';
import LocalAction from '../../stores/local/LocalAction';
import Swal from 'sweetalert2';

const columns = (onEditCell, onDeleteCell) => [
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
    dataField: 'localType',
    text: 'Tipo de local',
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

const LocalTable = ({ locals }) => {
  console.log(locals);
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el local?',
      text: 'No podras recuperar los datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        dispatch(LocalAction.deleteLocal(id));
        Swal.fire('Eliminado!', 'El local ha sido eliminado!', 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Los datos estan seguros', 'error');
      }
    });
  };

  /*const onDeleteCell = id => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el local?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(result => {
      if (result.value) {
        dispatch(LocalAction.deleteLocal(id));
        Swal.fire('Eliminado!', 'El local fue eliminado', 'success');
      }
    });
  };
  */
  const onEditCell = id => {
    history.push(`locals/edit/${id}`);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: locals.length
  };
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Locales" light={false}>
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
              onClick={() => history.push('/locals/create')}
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
        <Table
          reference={table}
          options={options}
          columns={columns(onEditCell, onDeleteCell)}
          items={locals}
          onSelect={onSelect}
        />
      </CardBody>
    </Card>
  );
};

LocalTable.propTypes = {
  locals: PropTypes.array.isRequired
};

export default LocalTable;
