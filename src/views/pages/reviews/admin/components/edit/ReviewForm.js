import React, { useContext } from 'react';
import Select from 'react-select';
import WizardInput from '../../../../../components/WizardInput';
import { ReviewContext } from '../../../../../context';
import { ReviewStateEnum } from '../../../../../../constants';

const ProductForm = ({ register, errors }) => {
  const { review, handleInputChangeReview } = useContext(ReviewContext);
  const { state = '' } = review;
  const selectOptions = [
    { value: ReviewStateEnum.InProgress, label: 'En proceso' },
    { value: ReviewStateEnum.Accept, label: 'Aprobado' },
    { value: ReviewStateEnum.Rejected, label: 'Rechazado' }
  ];

  return (
    <>
      <WizardInput
        type="select"
        label="Estado del producto"
        placeholder="Tipo"
        tag={Select}
        name="productType"
        id="productType"
        value={selectOptions.filter(x => x.value === state)[0]}
        onChange={({ value }) => {
          handleInputChangeReview({ name: 'state', value });
        }}
        innerRef={register({
          required: 'Seleccione un género'
        })}
        errors={errors}
        options={selectOptions}
      />
      <WizardInput
        type="textarea"
        label="Comentario"
        name="comment"
        rows="4"
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

export default ProductForm;
