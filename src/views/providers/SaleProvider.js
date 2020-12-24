import React, { useState, useEffect } from 'react';
import { SaleContext } from '../context';
import SaleModel from '../../models/SaleModel';
import ProductModel from '../../models/ProductModel';
import moment from 'moment';

const { Provider } = SaleContext;
const SaleProvider = ({ children, defultSale }) => {
  const [sale, setSale] = useState(
    defultSale || {
      ...new SaleModel(),
      product: new ProductModel(),
      saleDate: new moment()
    }
  );
  useEffect(() => {
    if (defultSale) {
      setSale(defultSale);
    }
  }, [defultSale]);

  const handleInputChangeSale = ({ value, name }) => setSale({ ...sale, [name]: value });
  const value = { sale, setSale, handleInputChangeSale };

  return <Provider value={value}>{children}</Provider>;
};

export default SaleProvider;
