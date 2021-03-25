import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductAction from '../../stores/product/ProductAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useProductsState from './useProductsState';
import useProductsEffect from './useProductsEffect';
import { selectProductOthers } from '../../selectors/product/ProductSelector';

const useProductsByTypeEffect = (selector = state => state.products, localId) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID]);
  const items = useProductsState(selectProductOthers);
  const hasErrors = useHasErrors([ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID_FINISHED]);
  const { item: others } = useProductsEffect(selectProductOthers);
  console.log(others);
  useEffect(() => {
    dispatch(ProductAction.getProductsByLocalId(localId));
  }, [dispatch, localId]);
  return { isRequesting, items, hasErrors };
};

export default useProductsByTypeEffect;
