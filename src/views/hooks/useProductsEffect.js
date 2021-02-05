import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';

const useProductsEffect = (selector = state => state.products, localId) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID]);
  const items = useProductsState(selector);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID_FINISHED]);
  useEffect(() => {
    dispatch(ProductAction.getProductsByLocalId(localId));
  }, [dispatch, localId]);
  return { isRequesting, items, hasErrors };
};

export default useProductsEffect;
