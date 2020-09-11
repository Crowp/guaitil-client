import React, { useState, useEffect } from 'react';
import { ProductContext } from '../context';
import ProductModel from '../../models/ProductModel';
import LocalModel from '../../models/LocalModel';
import ProductEnum from '../../constants/ProductEnum';
import ProductPriceModel from '../../models/ProductPriceModel';

const { Provider } = ProductContext;
const ProductProvider = ({ children, defaultProduct, defaultLocal }) => {
  const [product, setProduct] = useState(
    defaultProduct || {
      ...new ProductModel(),
      productPrice: new ProductPriceModel(),
      local: defaultLocal,
      productType: ProductEnum.Handicraft
    }
  );

  useEffect(() => {
    if (defaultProduct) {
      setProduct(defaultProduct);
    }
  }, [defaultProduct]);

  const handleInputChangeProduct = ({ value, name }) => setProduct({ ...product, [name]: value });
  const value = { product, setProduct, handleInputChangeProduct };

  return <Provider value={value}>{children}</Provider>;
};

export default ProductProvider;
