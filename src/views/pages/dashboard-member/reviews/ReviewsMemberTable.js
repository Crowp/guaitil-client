import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContainer from '../../../components/table/TableContainer';
import { useHistory } from 'react-router-dom';
import ActionOpenFormatter from './components/formatters/ActionOpenFormatter';

import { BadgeFormatter } from '../../../components/table/formatters';
import { useDispatch } from 'react-redux';
import ProductReviewAction from '../../../../stores/productReview/ProductReviewAction';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
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
    history.push(RouteMap.ReviewsMember.edit(id));
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
        actions={[{ color: 'info', icon: faFilter, text: 'Filtrar', onClick: toggleSearchBar }]}
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

export default ReviewsTable;
