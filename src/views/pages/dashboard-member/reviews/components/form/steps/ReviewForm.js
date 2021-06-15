import React, { useContext } from 'react';
import { ReviewContext } from '../../../../../../context';
import { ReviewStateEnum } from '../../../../../../../constants';
import { InputForm } from '../../../../../../components/forms/inputs';

const ProductForm = ({ errors }) => {
  const { stateForm, handleInputChangeReview } = useContext(ReviewContext);
  const { review } = stateForm;
  const { state = '', comment } = review;
  const labelOption =
    state === ReviewStateEnum.InProgress ? 'En proceso' : state === ReviewStateEnum.Accept ? 'Aprobado' : 'Rechazado';

  return (
    <>
      <InputForm
        id="state"
        name="state"
        label="Estado del producto"
        disabled={true}
        value={labelOption}
        onChange={handleInputChangeReview}
        errors={errors}
      />
      <InputForm
        type="textarea"
        label="Comentario"
        name="comment"
        rows="4"
        disabled
        value={comment}
        onChange={handleInputChangeReview}
        style={{ resize: 'none' }}
        id="description"
        errors={errors}
      />
    </>
  );
};

export default React.memo(ProductForm);
