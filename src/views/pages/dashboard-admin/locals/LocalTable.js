import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import LocalAction from '../../../../stores/local/LocalAction';
import RouteMap from '../../../../constants/RouteMap';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter, ShowFormatter } from '../../../components/table/formatters';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import ModalLocalContainer from '../locals/components/ModalLocalContainer';
import { useIsRequesting } from '../../../hooks';

const columnsDefault = (
  onEditCell,
  onDeleteCell,
  onShowInfoCell,
  onResetUserByLocalId,
  actionTypeReset,
  onShowLocalChange,
  actionTypeShow
) => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'localName',

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
    text: 'Dirección',
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
    dataField: 'show',
    text: 'Mostrar',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: ShowFormatter(onShowLocalChange, actionTypeShow),
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
    classes: 'border-0 py-2 align-middle justi',
    formatter: ActionFormatter(onEditCell, onDeleteCell, onShowInfoCell, onResetUserByLocalId, actionTypeReset),
    align: 'center'
  }
];

const LocalTable = ({ items }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localId, setLocalId] = useState();

  const toggle = () => setShowModal(!showModal);

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };
  const onShowInfoCell = id => {
    toggle();
    setLocalId(id);
  };

  const onDeleteCell = id => {
    setIdToDelete(id);
    toggleModal();
  };

  const onDeleteAction = () => {
    dispatch(LocalAction.deleteLocal(idToDelete));
    toggleModal();
  };

  const onShowLocalChange = id => () => {
    dispatch(LocalAction.onShowLocal(id));
  };

  const onEditCell = id => {
    history.push(RouteMap.Local.edit(id));
  };

  const onResetUserByLocalId = id => {
    dispatch(LocalAction.resetLocalPassword(id));
  };
  const generatePdf = () => {
    dispatch(LocalAction.getLocalsReportPdf());
  };

  const generateExcel = () => {
    dispatch(LocalAction.getLocalsReportExcel());
  };

  const isPasswordRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL_RESET_PASSWORD_GENERIC]);

  const columns = columnsDefault(
    onEditCell,
    onDeleteCell,
    onShowInfoCell,
    onResetUserByLocalId,
    isPasswordRequesting,
    onShowLocalChange,
    LocalAction.REQUEST_LOCAL_SHOW
  );

  return (
    <>
      <TableContainer
        columns={columns}
        items={items}
        title="Locales"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Local.create()) },
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
        title="Eliminar Local"
        description="¿Desea eliminar el producto?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
      <ModalLocalContainer toggle={toggle} modal={showModal} id={localId} />
    </>
  );
};

LocalTable.propTypes = {
  items: PropTypes.array.isRequired
};

export default React.memo(LocalTable);
