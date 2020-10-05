import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup } from 'reactstrap';
import FalconCardHeader from '../../../template/components/common/FalconCardHeader';
import ButtonIcon from '../../../template/components/common/ButtonIcon';
import { Table } from '../../components/tables';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionFormatter, EmailFormatter } from '../../components/tables/formatters';
import LocalAction from '../../../stores/local/LocalAction';
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
    dataField: 'firstLastName',

    text: 'Descripción',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'email',
    text: 'Email',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: EmailFormatter,
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

const UserTable = ({ users }) => {
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    Swal.fire({
      title: 'Estás seguro que quieres eliminar el usuario?',
      text: 'No podrás recuperar los datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        dispatch(LocalAction.deleteLocal(id));
        Swal.fire('Eliminado!', 'El usuario ha sido eliminado!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Los datos están seguros', 'error');
      }
    });
  };

  const onEditCell = id => {
    history.push(`/admin/users/edit/${id}`);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: users.length
  };
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Usuarios" light={false}>
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
              onClick={() => history.push('/admin/users/create')}
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
        <Table
          reference={table}
          options={options}
          columns={columns(onEditCell, onDeleteCell)}
          items={users}
          onSelect={onSelect}
        />
      </CardBody>
    </Card>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired
};

export default React.memo(UserTable);
