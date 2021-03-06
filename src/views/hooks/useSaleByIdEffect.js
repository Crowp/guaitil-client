import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import SaleAction from '../../stores/sale/SaleAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useSalesState from './useSalesState';

const useSaleByIdEffect = id => {
  const dispatch = useDispatch();
  const [sale, setSale] = useState({});
  const [load, setLoad] = useState(false);
  const sales = useSalesState();

  const isRequesting = useIsRequesting([SaleAction.REQUEST_SALE_BY_ID]);
  const hasErrors = useHasErrors([SaleAction.REQUEST_SALE_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(sales) && id) {
      const [saleFounded = false] = sales.filter(item => item.id === Number(id));
      if (saleFounded) {
        setSale(saleFounded);
      }
    } else if (!load && id) {
      dispatch(SaleAction.getSaleById(id));
      setLoad(true);
    }
  }, [dispatch, id, sales, load]);

  return { isRequesting, sale, hasErrors, sales };
};

export default useSaleByIdEffect;
