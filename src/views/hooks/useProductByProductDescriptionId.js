import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';

const useProductByProductDescriptionId = id => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(false);
  const products = useProductsState();
  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCTS_BY_PRODUCT_DESCRIPTION_ID]);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCTS_BY_PRODUCT_DESCRIPTION_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(products) && id) {
      const [productFounded = {}] = products.filter(item => item.productDescription.id === Number(id));
      if (productFounded) {
        setProduct(productFounded);
      }
    }
    if (!load && id) {
      dispatch(ProductAction.getProductsByProductDescriptionId(id));
      setLoad(true);
    }
  }, [dispatch, id, products, load]);

  return { isRequesting, product, hasErrors, products };
};

export default useProductByProductDescriptionId;
