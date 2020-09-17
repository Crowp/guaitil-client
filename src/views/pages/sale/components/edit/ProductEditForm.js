import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../../components/WizardInput';
import ProductAction from '../../../../../stores/product/ProductAction';
import Select from 'react-select';
import { selectProductOptions } from '../../../../../selectors/product/ProductSelector';
import { useSelector, useDispatch } from 'react-redux';
import { SaleContext } from '../../../../context';

const SaleForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { handleInputChangeSale } = useContext(SaleContext);

  const [productId, setProductId] = useState('');

  const products = useSelector(selectProductOptions);

  const productsOjetives = useSelector(state => state.products);

  const [productSelected] = productsOjetives.filter(x => x.id === productId);

  useEffect(() => {
    dispatch(ProductAction.getProductsByMemberId());
  }, [dispatch]);

  useEffect(() => {
    handleInputChangeSale({
      name: 'product',
      value: productSelected
    });
  }, [productId, productSelected]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione el Producto"
        placeholder="Seleccione el Producto"
        tag={Select}
        name="productId"
        id="productId"
        value={products.filter(x => x.value === productId)[0]}
        onChange={({ value = '' }) => {
          setProductId(value);
        }}
        innerRef={register({
          required: 'Seleccione el Producto'
        })}
        errors={errors}
        options={products}
        isSearchable
      />
    </>
  );
};

export default SaleForm;
