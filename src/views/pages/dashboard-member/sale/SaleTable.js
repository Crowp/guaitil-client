import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter } from '../../../components/table/formatters';
import SaleAction from '../../../../stores/sale/SaleAction';
import { RouteMap } from '../../../../constants';

const columnsDefault = (onEditCell, onDeleteCell) => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'saleDate',

    text: 'Fecha de venta ',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'amountSold',
    text: 'Cantidad vendida',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'productName',
    text: 'Nombre producto',
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

const SaleTable = ({ sales }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [modal, setModal] = useState(false);

  const onDeleteCell = id => {
    setIdToDelete(id);
    toggleModal();
  };

  const onEditCell = id => {
    history.push(RouteMap.Sale.edit(id));
  };
  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };

  const onDeleteAction = () => {
    dispatch(SaleAction.deleteSale(idToDelete));
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
        items={sales}
        title="Ventas"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push(RouteMap.Sale.create()) },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar venta"
        description="¿Desea eliminar la venta?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};
SaleTable.propTypes = {
  sales: PropTypes.array.isRequired
};

export default React.memo(SaleTable);
