import React, { useContext } from 'react';
import Select from 'react-select';
import { ReviewContext } from '../../../../../../context';
import { ProductEnum } from '../../../../../../../constants';
import { InputForm, SelectInputForm } from '../../../../../../components/forms/inputs';
import { whitespacesValidation, aCharacterValidation } from '../../../../../../components/forms/inputs/validations';

const ProductForm = ({ register, errors, control }) => {
  const { stateForm, handleInputChangeReview } = useContext(ReviewContext);
  const { review } = stateForm;
  const { productDescription } = review;
  const { productType = '', description, name } = productDescription;
  const selectOptions = [
    { value: ProductEnum.Handicraft, label: 'Artesania' },
    { value: ProductEnum.Food, label: 'Comida' },
    { value: ProductEnum.Other, label: 'Otro' }
  ];

  const onChangeProductDescription = ({ name, value }) => {
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
        control={control}
        value={selectOptions.filter(x => x.value === productType)[0]}
        onChange={onChangeProductDescription}
        errors={errors}
        options={selectOptions}
        errorMessage="Seleccione el tipo de producto"
      />
      <InputForm
        label="Nombre del producto"
        placeholder="Nombre..."
        name="name"
        value={name}
        onChange={onChangeProductDescription}
        id="name"
        className="input-spin-none"
        innerRef={register({
          ...defaultInnerRef
        })}
        errors={errors}
      />

      <InputForm
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={onChangeProductDescription}
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
const defaultInnerRef = {
  required: 'Campo obligatorio',
  validate: {
    whitespacesValidation,
    aCharacterValidation
  },
  minLength: {
    value: 3,
    message: 'Debe ser de al menos 3 caracteres'
  }
};

export default React.memo(ProductForm);
