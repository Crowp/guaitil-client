import React, { useContext } from 'react';
import Select from 'react-select';
import { SelectInputForm } from '../../../../../../components/forms/inputs';
import { selectProductOptions } from '../../../../../../../selectors/product/ProductSelector';
import { SaleContext } from '../../../../../../context';
import useProductsByMemberId from '../../../../../../hooks/useProductsByMemberId';

const ProductForm = ({ register, errors }) => {
  const { sale, handleProductChange } = useContext(SaleContext);
  const { items: products } = useProductsByMemberId(selectProductOptions);
  const { product } = sale;
  return (
    <>
      <SelectInputForm
        type="select"
        label="Seleccione el Producto"
        placeholder="Seleccione el Producto"
        tag={Select}
        name="product"
        id="product"
        value={products.filter(x => x.value === product.id)[0]}
        onChange={handleProductChange}
        innerRef={register({
          required: 'Seleccione un producto'
        })}
        errors={errors}
        options={products}
        isSearchable
      />
    </>
  );
};

export default React.memo(ProductForm);
