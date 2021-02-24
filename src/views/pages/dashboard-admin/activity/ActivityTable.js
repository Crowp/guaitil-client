import React, { useState } from 'react';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter } from '../../../components/tables/formatters';
import ActivityAction from '../../../../stores/activity/ActivityAction';
import { RouteMap } from '../../../../constants';

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

const ActivityTable = ({ activities, all = false }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteCell = id => {
    setIdToDelete(id);
    toggleModal();
  };

  const onEditCell = id => {
    history.push(RouteMap.Activity.edit(id));
  };
  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };
  const onDeleteAction = () => {
    dispatch(ActivityAction.deleteActivity(idToDelete));
    toggleModal();
  };

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };
  let columns = columnsDefault(onEditCell, onDeleteCell);

  if (!all) {
    columns = columns.filter(column => column.dataField !== 'activityType');
  }

  return (
    <>
      <TableContainer
        columns={columns}
        items={activities}
        title="Actividades"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Activity.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar Actividad"
        description="¿Desea eliminar la actividad?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.array.isRequired
};

export default React.memo(ActivityTable);
