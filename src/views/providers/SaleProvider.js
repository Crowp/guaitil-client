import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { SaleContext } from '../context';
import SaleModel from '../../models/SaleModel';
import SaleAction from '../../stores/sale/SaleAction';

const { Provider } = SaleContext;
const SaleProvider = ({ children, defaultItem }) => {
  const [sale, setSale] = useState(
    defaultItem || {
      ...new SaleModel(),
      product: { id: 0 },
      saleDate: new moment()
    }
  );

  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setSale(defaultItem);
    }
  }, [defaultItem]);

  const handleInputChangeSale = ({ value, name }) => setSale({ ...sale, [name]: value });

  const handleProductChange = ({ value, name }) => {
    const [productSelected] = products.filter(x => x.id === value);
    handleInputChangeSale({
      name: name,
      value: productSelected || { id: 0 }
    });
  };

  const handleSaleCreate = () => {
    dispatch(SaleAction.createSale(sale));
  };

  const handleSaleUpdate = () => {
    dispatch(SaleAction.updateSale(sale));
  };

  const value = {
    sale,
    setSale,
    handleInputChangeSale,
    handleProductChange,
    handleSaleCreate,
    handleSaleUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default SaleProvider;

SaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultItem: PropTypes.any
};
