import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import LocalAction from '../../../../stores/local/LocalAction';
import RouteMap from '../../../../constants/RouteMap';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter } from '../../../components/table/formatters';
import ModalConfirm from '../../../components/modals/ModalConfirm';

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

const LocalTable = ({ items }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };

  const onDeleteCell = id => {
    setIdToDelete(id);
    toggleModal();
  };

  const onDeleteAction = () => {
    dispatch(LocalAction.deleteLocal(idToDelete));
    toggleModal();
  };

  const onEditCell = id => {
    history.push(RouteMap.Local.edit(id));
  };

  const columns = columnsDefault(onEditCell, onDeleteCell);

  return (
    <>
      <TableContainer
        columns={columns}
        items={items}
        title="Inventario"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Local.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar Local"
        description="¿Desea eliminar el producto?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};

LocalTable.propTypes = {
  items: PropTypes.array.isRequired
};

export default React.memo(LocalTable);
