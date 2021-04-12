import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import TableContainer from '../../../components/table/TableContainer';
import { ActionFormatter, ShowFormatter } from '../../../components/table/formatters';
import ProductAction from '../../../../stores/product/ProductAction';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { RouteMap } from '../../../../constants';
import ModalProductContainer from './component/ModalProductContainer';

const columnsDefault = (onEditCell, onDeleteCell, onShowInfoCell, onShowLocalChange, actionType) => [
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
    dataField: 'show',
    text: 'Mostrar',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: ShowFormatter(onShowLocalChange, actionType),
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

const ProductTable = ({ products, localId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState();

  const toggle = () => setShowModal(!showModal);

  const onShowInfoCell = id => {
    toggle();
    setProductId(id);
  };

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

  const onShowProductChange = id => () => {
    dispatch(ProductAction.onShowProduct(id));
  };
  const generatePdf = () => {
    dispatch(ProductAction.getProductsReportPdf());
  };

  const generateExcel = () => {
    dispatch(ProductAction.getProductsReportExcel());
  };

  const columns = columnsDefault(
    onEditCell,
    onDeleteCell,
    onShowInfoCell,
    onShowProductChange,
    ProductAction.REQUEST_PRODUCT_SHOW
  );

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
          {
            color: 'primary',
            icon: faExternalLinkAlt,
            text: 'Exportar',
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
          { color: 'primary', text: 'Cencelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
      <ModalProductContainer toggle={toggle} modal={showModal} id={productId} />
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default React.memo(ProductTable);
