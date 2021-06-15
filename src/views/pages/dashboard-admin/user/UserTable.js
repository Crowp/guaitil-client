import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionFormatter, EmailFormatter } from '../../../components/table/formatters';
import TableContainer from '../../../components/table/TableContainer';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import { faExternalLinkAlt, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserAction from '../../../../stores/user/UserAction';
import { RouteMap } from '../../../../constants';
import ModalContainer from './components/ModalContainer';
import AuthAction from '../../../../stores/auth/AuthAction';
import { useIsRequesting } from '../../../hooks';

const columnsDefault = (onEditCell, onDeleteCell, onShowInfoCell, onResetUserById, isUserResetPasswordRequesting) => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'dni',
    text: 'Cédula',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'nameComplete',

    text: 'Nombre completo',
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
    dataField: 'isOnReset',
    hidden: true
  },
  {
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionFormatter(
      onEditCell,
      onDeleteCell,
      onShowInfoCell,
      onResetUserById,
      isUserResetPasswordRequesting
    ),
    align: 'right'
  }
];

const UserTable = ({ items }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);

  const [modalUserInfo, setModalUserInfo] = useState(false);
  const [userId, setUserId] = useState();

  const toggle = () => setModalUserInfo(!modalUserInfo);

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };
  const generatePdf = () => {
    dispatch(AuthAction.getAuthReportPdf());
  };

  const generateExcel = () => {
    dispatch(AuthAction.getAuthReportExcel());
  };

  const onDeleteCell = id => {
    setIdToDelete(id);
    toggleModal();
  };
  const onShowInfoCell = id => {
    toggle();
    setUserId(id);
  };
  const onDeleteAction = () => {
    dispatch(UserAction.deleteUser(idToDelete));
    toggleModal();
  };

  const onEditCell = id => {
    history.push(RouteMap.User.edit(id));
  };

  const onResetUserById = id => {
    dispatch(UserAction.resetUserPassword(id));
  };

  const isUserResetPasswordRequesting = useIsRequesting([UserAction.REQUEST_USER_RESET_GENERIC_PASSWORD]);

  const columns = columnsDefault(
    onEditCell,
    onDeleteCell,
    onShowInfoCell,
    onResetUserById,
    isUserResetPasswordRequesting
  );

  return (
    <>
      <TableContainer
        columns={columns}
        items={items}
        title="Administradores"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.User.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          {
            color: 'primary',
            icon: faExternalLinkAlt,
            text: 'Exportar',
            disabled: items.length === 0,
            children: [
              { text: 'Exportar en PDF', onClick: generatePdf },
              { text: 'Exportar en Excel', onClick: generateExcel }
            ]
          }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar administrador"
        description="¿Desea eliminar el administrador?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
      <ModalContainer toggle={toggle} modal={modalUserInfo} id={userId} />
    </>
  );
};

UserTable.propTypes = {
  items: PropTypes.array.isRequired
};

export default React.memo(UserTable);
