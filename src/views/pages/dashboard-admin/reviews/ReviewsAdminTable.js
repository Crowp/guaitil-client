import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContainer from '../../../components/table/TableContainer';
import { useHistory } from 'react-router-dom';
import { faPlus, faFilter, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import ActionOpenFormatter from './components/formatters/ActionOpenFormatter';
import { BadgeFormatter } from '../../../components/table/formatters';
import { useDispatch } from 'react-redux';
import ProductReviewAction from '../../../../stores/productReview/ProductReviewAction';
import ModalConfirm from '../../../components/modals/ModalConfirm';
import { RouteMap } from '../../../../constants';

const columnsDefault = onOpenCell => [
  {
    dataField: 'id',
    hidden: true
  },
  {
    dataField: 'reviewDate',

    text: 'Última revisión',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'state',

    text: 'Estado',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: BadgeFormatter,
    sort: true
  },
  {
    dataField: 'productName',
    text: 'Nombre del producto',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: '',
    text: 'Acciones',
    headerClasses: 'border-0 text-center',
    classes: 'border-0 py-2 align-middle',
    formatter: ActionOpenFormatter(onOpenCell),
    align: 'center'
  }
];

const ReviewsTable = ({ reviews }) => {
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
    history.push(RouteMap.Reviews.edit(id));
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };
  const onDeleteAction = () => {
    dispatch(ProductReviewAction.deleteProductReview(idToDelete));
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
        items={reviews}
        title="Revisiones"
        searchBarIsOpen={searchBar}
        actions={[
          { color: 'success', icon: faPlus, text: 'Crear', onClick: () => history.push('/admin/reviews/create') },
          { color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar },
          { color: 'primary', icon: faExternalLinkAlt, text: 'Exportar', onClick: () => ({}) }
        ]}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar revisión"
        description="¿Desea eliminar la revisión?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteAction }
        ]}
      />
    </>
  );
};

ReviewsTable.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default React.memo(ReviewsTable);
