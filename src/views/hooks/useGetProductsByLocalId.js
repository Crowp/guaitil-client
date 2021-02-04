import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';

const useProductByLocalIdEffect = (selector = state => state.sales, id) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(false);
  const items = useProductsState(selector);

  console.log(items);

  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID]);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(items) && id) {
      const [ProductsFounded = {}] = items.map(item => item.id === Number(id));
      if (ProductsFounded) {
        setProduct(ProductsFounded);
      }
    } else if (!load && id) {
      dispatch(ProductAction.getProductsByLocalId(id));
      setLoad(true);
    }
  }, [dispatch, id, items, load]);

  return { isRequesting, product, hasErrors, items };
};

export default useProductByLocalIdEffect;
