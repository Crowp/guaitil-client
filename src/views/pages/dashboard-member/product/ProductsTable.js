import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter } from '../../../components/tables/formatters';
import ProductAction from '../../../../stores/product/ProductAction';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
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
    dataField: 'status',
    text: 'Estado',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'productType',
    text: 'Tipo de producto',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'productCost',
    text: 'Costo producto',
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

const ProductTable = ({ products, localId }) => {
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
  const onEditCell = id => {
    console.log(id);
    history.push(RouteMap.LocalMember.editProduct(localId, id));
  };
  const onDeleteAction = () => {
    dispatch(ProductAction.deleteProduct(idToDelete));
    toggleModal();
  };

  const columns = columnsDefault(onEditCell, onDeleteCell);

  return (
    <>
      <TableContainer
        columns={columns}
        items={products}
        title="Inventario"
        searchBarIsOpen={searchBar}
        actions={[
          {
            color: 'success',
            icon: faPlus,
            text: 'Crear',
            onClick: () => history.push(RouteMap.LocalMember.createProduct(localId))
          },
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
          { color: 'primary', text: 'Cencelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default React.memo(ProductTable);
