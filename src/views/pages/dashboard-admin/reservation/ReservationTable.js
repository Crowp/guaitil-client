import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { ActionFormatter } from '../../../components/table/formatters';
import ReservationAction from '../../../../stores/reservation/ReservationAction';
import RouteMap from '../../../../constants/RouteMap';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import TableContainer from '../../../components/table/TableContainer';

const columnsDefault = (onEditCell, onDeleteCell) => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'dateReservation',

    text: 'Fecha de reservación',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'amountPerson',

    text: 'Cantidad de personas',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'reservationState',
    text: 'Estado de reservación',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'fullName',
    text: 'Nombre completo',
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

const MemberTable = ({ reservations }) => {
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
    history.push(RouteMap.Reservation.edit(id));
  };
  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };

  const onDeleteAction = () => {
    dispatch(ReservationAction.deleteReservation(idToDelete));
    toggleModal();
  };

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const columns = columnsDefault(onEditCell, onDeleteCell);
  return (
    <>
      <TableContainer
        columns={columns}
        items={reservations}
        title="Reservaciones"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Reservation.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar reservación"
        description="¿Desea eliminar la reservación?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};

MemberTable.propTypes = {
  reservations: PropTypes.array.isRequired
};

export default React.memo(MemberTable);
