import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';

const useProductsEffect = (selector = state => state.products) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCT]);
  const items = useProductsState(selector);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCT_FINISHED]);
  useEffect(() => {
    dispatch(ProductAction.getProducts());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useProductsEffect;
