import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import MemberAction from '../../../../stores/member/MemberAction';
import RouteMap from '../../../../constants/RouteMap';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter } from '../../../components/table/formatters';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import ModalContainer from './components/ModalContainer';

const columnsDefault = (onEditCell, onDeleteCell, onShowInfoCell) => [
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

    text: 'Apellido 1',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'secondLastName',

    text: 'Apellido 2',
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
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionFormatter(onEditCell, onDeleteCell, onShowInfoCell),
    align: 'right'
  }
];

const MemberTable = ({ items }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalMemberInfo, setModalMemberInfo] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [memberId, setMemberId] = useState();

  const toggle = () => setModalMemberInfo(!modalMemberInfo);

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
  const onShowInfoCell = id => {
    toggle();
    setMemberId(id);
  };

  const onDeleteAction = () => {
    dispatch(MemberAction.deleteMember(idToDelete));
    toggleModal();
  };

  const onEditCell = id => {
    history.push(RouteMap.Member.edit(id));
  };

  const columns = columnsDefault(onEditCell, onDeleteCell, onShowInfoCell);

  return (
    <>
      <TableContainer
        columns={columns}
        items={items}
        title="Miembros"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Member.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar Miembro"
        description="¿Desea eliminar el miembro?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
      <ModalContainer toggle={toggle} modal={modalMemberInfo} id={memberId} />
    </>
  );
};

MemberTable.propTypes = {
  items: PropTypes.array.isRequired
};

export default React.memo(MemberTable);
