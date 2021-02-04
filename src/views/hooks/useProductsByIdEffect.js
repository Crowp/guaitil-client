import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';

const useProductByIdEffect = id => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(false);
  const items = useProductsState();

  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCT_BY_ID]);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCT_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(items) && id) {
      const [ProductFounded = {}] = items.filter(item => item.id === Number(id));
      if (ProductFounded) {
        setProduct(ProductFounded);
      }
    } else if (!load && id) {
      dispatch(ProductAction.getProductById(id));
      setLoad(true);
    }
  }, [dispatch, id, items, load]);

  return { isRequesting, product, hasErrors, items };
};

export default useProductByIdEffect;
