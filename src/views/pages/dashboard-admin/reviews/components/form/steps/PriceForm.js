import React, { useContext } from 'react';
import { ReviewContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

const PriceForm = ({ register, errors }) => {
  const { review, handleInputChangeReview } = useContext(ReviewContext);
  const { product } = review;
  const { productPrice } = product;
  const { cost, sale } = productPrice;

  const onChangePrice = ({ name, value }) => {
    console.log(name, value);
    handleInputChangeReview({
      name: 'product',
      value: { ...product, productPrice: { ...productPrice, [name]: value } }
    });
  };

  return (
    <>
      <InputForm
        label="Precio costo Producto"
        type="number"
        placeholder="Precio..."
        name="cost"
        value={cost}
        onChange={onChangePrice}
        id="cost"
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
        label="Precio de venta"
        placeholder="Precio de venta..."
        name="sale"
        type="number"
        value={sale}
        onChange={onChangePrice}
        id="sale"
        className="input-spin-none"
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'El campo debe tener al menos dos numeros'
          }
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(PriceForm);
