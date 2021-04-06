import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import { selectProducts } from '../../../../selectors/product/ProductSelector';
import Loader from '@/template/components/common/Loader';
import { RouteMap } from '../../../../constants';
import useProductsEffect from '../../../hooks/useProductsEffect';
import ProductsTable from './ProductsTable';

const ProductManagment = ({ localId }) => {
  const history = useHistory();

  const { isRequesting, items: product } = useProductsEffect(selectProducts, localId);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(product) ? (
    <ProductsTable products={product} localId={localId} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.LocalMember.createProduct(localId))}
      actionName="Registrar un producto"
      title="Administración de productos"
      description="Aún no hay productos registrados!"
    />
  );
};

export default React.memo(ProductManagment);
