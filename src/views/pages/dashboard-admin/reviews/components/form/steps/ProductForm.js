import React, { useContext } from 'react';
import Select from 'react-select';
import { ReviewContext } from '../../../../../../context';
import { ProductEnum } from '../../../../../../../constants';
import { InputForm, SelectInputForm } from '../../../../../../components/forms/inputs';

const ProductForm = ({ register, errors }) => {
  const { review, handleInputChangeReview } = useContext(ReviewContext);
  const { product } = review;
  const { productType = '', description, name } = product;
  const selectOptions = [
    { value: ProductEnum.Handicraft, label: 'Artesania' },
    { value: ProductEnum.Food, label: 'Comida' },
    { value: ProductEnum.Other, label: 'Otro' }
  ];

  const onChangeProduct = ({ name, value }) => {
    handleInputChangeReview({ name: 'product', value: { ...review.product, [name]: value } });
  };
  return (
    <>
      <SelectInputForm
        type="select"
        label="Tipo de producto"
        placeholder="Tipo producto"
        tag={Select}
        name="productType"
        id="productType"
        value={selectOptions.filter(x => x.value === productType)[0]}
        onChange={onChangeProduct}
        innerRef={register({
          required: 'Seleccione un tipo de proucto'
        })}
        errors={errors}
        options={selectOptions}
      />
      <InputForm
        label="Nombre del producto"
        placeholder="Nombre..."
        name="name"
        value={name}
        onChange={onChangeProduct}
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

      <InputForm
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={onChangeProduct}
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

export default React.memo(ProductForm);
