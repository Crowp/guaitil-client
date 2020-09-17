import React, { useContext } from 'react';
import Select from 'react-select';
import WizardInput from '../../../../../components/WizardInput';
import { ReviewContext } from '../../../../../context';
import { ProductEnum } from '../../../../../../constants';

const ProductForm = ({ register, errors }) => {
  const { review, handleInputChangeProductReview } = useContext(ReviewContext);
  const { product } = review;
  const { productType = '' } = product;
  const selectOptions = [
    { value: ProductEnum.Handicraft, label: 'Artesania' },
    { value: ProductEnum.Food, label: 'Comida' },
    { value: ProductEnum.Other, label: 'Otro' }
  ];

  return (
    <>
      <WizardInput
        type="select"
        label="Tipo de producto"
        placeholder="Tipo"
        tag={Select}
        name="productType"
        id="productType"
        value={selectOptions.filter(x => x.value === productType)[0]}
        onChange={({ value }) => {
          handleInputChangeProductReview({ name: 'productType', value });
        }}
        innerRef={register({
          required: 'Seleccione un género'
        })}
        errors={errors}
        options={selectOptions}
      />
      <WizardInput
        label="Nombre del producto"
        placeholder="Nombre..."
        name="name"
        value={product}
        onChange={({ target }) => {
          handleInputChangeProductReview(target);
        }}
        id="name"
        className="input-spin-none"
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'Password must have at least 2 characters'
          }
        })}
        errors={errors}
      />

      <WizardInput
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={product}
        onChange={({ target }) => {
          handleInputChangeProductReview(target);
        }}
        style={{ resize: 'none' }}
        id="description"
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
    </>
  );
};

export default ProductForm;
