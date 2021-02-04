import React, { useState, useEffect } from 'react';
import { ProductContext } from '../context';
import ProductModel from '../../models/ProductModel';
import ProductEnum from '../../constants/ProductEnum';
import ProductPriceModel from '../../models/ProductPriceModel';
import { useDispatch } from 'react-redux';
import ProductAction from '../../stores/product/ProductAction';

const { Provider } = ProductContext;
const ProductProvider = ({ children, defaultProduct, defaultLocal }) => {
  console.log(defaultLocal);
  const [product, setProduct] = useState(
    defaultProduct || {
      ...new ProductModel(),
      productPrice: new ProductPriceModel(),
      local: defaultLocal,
      productType: ProductEnum.Handicraft
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultProduct) {
      setProduct(defaultProduct);
    }
  }, [defaultProduct]);

  const handleInputProductChange = ({ value, name }) => setProduct({ ...product, [name]: value });

  const handleProductCreate = () => {
    console.log(product);
    dispatch(ProductAction.createProduct(product));
  };

  const handleProductUpdate = () => {
    dispatch(ProductAction.updateProduct(product));
  };

  const value = {
    product,
    setProduct,
    handleInputProductChange,
    handleProductCreate,
    handleProductUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ProductProvider;
