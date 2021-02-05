import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SaleAction from '../../stores/sale/SaleAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useSalesState from './useSalesState';

const useSalesEffect = (selector = state => state.sales) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([SaleAction.REQUEST_SALES_BY_MEMBER_ID]);
  const items = useSalesState(selector);
  const hasErrors = useHasErrors([SaleAction.REQUEST_SALES_BY_MEMBER_ID_FINISHED]);
  useEffect(() => {
    dispatch(SaleAction.getSalesByMemberId());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useSalesEffect;
