import React, { useContext } from 'react';
import WizardInput from '../../../../../components/WizardInput';
import { ReviewContext } from '../../../../../context';

const ProductForm = ({ register, errors }) => {
  const { review, handleInputChangeReview } = useContext(ReviewContext);

  return (
    <>
      <WizardInput
        label="Estado del producto"
        placeholder="Estado"
        name="state"
        id="state"
        value={review}
        disabled
        className="input-spin-none"
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'La longitud debe ser de al menos 2 caracteres'
          }
        })}
        errors={errors}
      />
      <WizardInput
        type="textarea"
        label="Comentario"
        name="comment"
        rows="4"
        disabled
        value={review}
        onChange={({ target }) => {
          handleInputChangeReview(target);
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

export default React.memo(ProductForm);
