import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalsState from './useLocalsState';
import ProductAction from '../../stores/product/ProductAction';

const useProductsByMemberId = (selector = state => state.products) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCTS_BY_MEMBER_ID]);
  const items = useLocalsState(selector);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCTS_BY_MEMBER_ID_FINISHED]);
  useEffect(() => {
    dispatch(ProductAction.getProductsByMemberId());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useProductsByMemberId;
