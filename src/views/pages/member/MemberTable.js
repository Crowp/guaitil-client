import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CustomInput, InputGroup } from 'reactstrap';
import FalconCardHeader from '../../components/common/FalconCardHeader';
import ButtonIcon from '../../components/common/ButtonIcon';
import { Table } from '../../components/tables';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EmailFormatter, PhoneFormatter, ActionFormatter } from '../../components/tables/formatters';
import MemberAction from '../../../stores/member/MemberAction';
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
    dataField: 'LastNames',

    text: 'Apellidos',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'dni',
    text: 'Cedula',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'memberType',
    text: 'Tipo',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'email',
    headerClasses: 'border-0',
    text: 'Email',
    classes: 'border-0 py-2 align-middle',
    formatter: EmailFormatter,
    sort: true
  },
  {
    dataField: 'telephone',
    headerClasses: 'border-0',
    text: 'Telefono',
    classes: 'border-0 py-2 align-middle',
    formatter: PhoneFormatter,
    sort: true
  },
  {
    dataField: 'occupation',
    text: 'Ocupación',
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

const MemberTable = ({ members }) => {
  let table = createRef();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el miembro?',
      text: 'No podras recuperar los datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        dispatch(MemberAction.deleteMember(id));
        Swal.fire('Eliminado!', 'El miembro ha sido eliminado!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Los datos estan seguros', 'error');
      }
    });
  };

  const onEditCell = id => {
    history.push(`members/edit/${id}`);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };
  const options = {
    custom: true,
    sizePerPage: 12,
    totalSize: members.length
  };
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Miembros" light={false}>
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
              onClick={() => history.push('members/create')}
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
          items={members}
          onSelect={onSelect}
        />
      </CardBody>
    </Card>
  );
};

MemberTable.propTypes = {
  members: PropTypes.array.isRequired
};

export default React.memo(MemberTable);
