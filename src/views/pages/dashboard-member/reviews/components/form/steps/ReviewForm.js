import React, { useContext } from 'react';
import Select from 'react-select';
import { ReviewContext } from '../../../../../../context';
import { ReviewStateEnum } from '../../../../../../../constants';
import { InputForm, SelectInputForm } from '../../../../../../components/forms/inputs';

const ProductForm = ({ register, errors }) => {
  const { stateForm, handleInputChangeReview } = useContext(ReviewContext);
  const { review } = stateForm;
  const { state = '', comment } = review;
  const selectOptions = [
    { value: ReviewStateEnum.InProgress, label: 'En proceso' },
    { value: ReviewStateEnum.Accept, label: 'Aprobado' },
    { value: ReviewStateEnum.Rejected, label: 'Rechazado' }
  ];

  return (
    <>
      <SelectInputForm
        id="state"
        name="state"
        type="select"
        label="Estado del producto"
        placeholder="Tipo"
        tag={Select}
        disabled
        value={selectOptions.filter(x => x.value === state)[0]}
        onChange={handleInputChangeReview}
        innerRef={register({
          required: 'Seleccione un género'
        })}
        errors={errors}
        options={selectOptions}
      />
      <InputForm
        type="textarea"
        label="Comentario"
        name="comment"
        rows="4"
        value={comment}
        onChange={handleInputChangeReview}
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
