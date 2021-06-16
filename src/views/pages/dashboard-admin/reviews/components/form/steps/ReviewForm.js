import React, { useContext } from 'react';
import Select from 'react-select';
import { ReviewContext } from '../../../../../../context';
import { ReviewStateEnum } from '../../../../../../../constants';
import { InputForm, SelectInputForm } from '../../../../../../components/forms/inputs';

const ProductForm = ({ register, errors, control }) => {
  const { stateForm, handleInputChangeReview } = useContext(ReviewContext);
  const { review } = stateForm;
  const { state = '', comment } = review;
  const selectOptions = [
    { value: ReviewStateEnum.Accept, label: 'Aprobado' },
    { value: ReviewStateEnum.Rejected, label: 'Rechazado' }
  ];

  return (
    <>
      <SelectInputForm
        type="select"
        label="Estado del producto"
        placeholder="Tipo"
        tag={Select}
        name="productType"
        id="productType"
        control={control}
        value={selectOptions.filter(x => x.value === state)[0]}
        onChange={({ value }) => {
          handleInputChangeReview({ name: 'state', value });
        }}
        errors={errors}
        options={selectOptions}
        errorMessage="seleccione el estado del producto"
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
          required: false
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(ProductForm);
