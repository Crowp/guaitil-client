import React, { useState, useEffect } from 'react';
import { ProductContext } from '../context';
import ProductModel from '../../models/ProductModel';
import ProductPriceModel from '../../models/ProductPriceModel';
import { useDispatch } from 'react-redux';
import ProductAction from '../../stores/product/ProductAction';
import ProductDescription from '../../models/ProductDescription';

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
    debugger;
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
