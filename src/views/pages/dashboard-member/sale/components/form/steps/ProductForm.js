import React, { useContext } from 'react';
import Select from 'react-select';
import { SelectInputForm } from '../../../../../../components/forms/inputs';
import { selectProductOptions } from '../../../../../../../selectors/product/ProductSelector';
import { SaleContext } from '../../../../../../context';
import useProductsByMemberId from '../../../../../../hooks/useProductsByMemberId';

const ProductForm = ({ errors, control, isUpdate }) => {
  const { sale, handleProductChange } = useContext(SaleContext);
  const { items: products } = useProductsByMemberId(selectProductOptions);
  const { productDescription } = sale;
  console.log(products.filter(x => x.value === productDescription.id)[0]);
  return (
    <>
      <SelectInputForm
        type="select"
        label="Seleccione el Producto"
        placeholder="Seleccione el Producto"
        name="productDescription"
        id="productDescription"
        control={control}
        value={products.filter(x => x.value === productDescription.id)[0]}
        onChange={handleProductChange}
        errors={errors}
        options={products}
        isDisabled={isUpdate}
        errorMessage="Debe seleccionar un producto"
        noOptionsMessage={() => 'No hay productos creados, por favor registre uno y vuelva a intentarlo'}
      />
    </>
  );
};

export default React.memo(ProductForm);
