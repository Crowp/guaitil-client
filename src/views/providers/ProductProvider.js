import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ProductContext } from '../context';
import ProductModel from '../../models/ProductModel';
import ProductPriceModel from '../../models/ProductPriceModel';
import ProductAction from '../../stores/product/ProductAction';
import ProductDescription from '../../models/ProductDescription';
import PropTypes from 'prop-types';

const { Provider } = ProductContext;
const ProductProvider = ({ children, defaultItem, localId }) => {
  const [product, setProduct] = useState(
    defaultItem || {
      ...new ProductModel(),
      productDescription: {
        ...new ProductDescription(),
        productPrice: new ProductPriceModel()
      },
      local: { id: localId }
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setProduct(defaultItem);
    }
  }, [defaultItem]);

  const handleInputProductChange = ({ value, name }) => setProduct({ ...product, [name]: value });

  const handleProductDescriptionChange = ({ value, name }) =>
    handleInputProductChange({ name: 'productDescription', value: { ...product.productDescription, [name]: value } });

  const handleProductCreate = () => {
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
    handleProductUpdate,
    handleProductDescriptionChange
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ProductProvider;

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultItem: PropTypes.any,
  localId: PropTypes.string
};
