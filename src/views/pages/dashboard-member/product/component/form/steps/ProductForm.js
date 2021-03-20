import React, { useContext } from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../../../context';
import { ProductEnum } from '../../../../../../../constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

import { whitespacesValidation, aCharacterValidation } from '../../../../../../components/forms/inputs/validations';

const LocalForm = ({ register, errors, control }) => {
  const {
    product: { productDescription = {} },
    handleProductDescriptionChange
  } = useContext(ProductContext);
  const { productType = '', name, description } = productDescription;

  const selectOptions = [
    { value: ProductEnum.Handicraft, label: 'Artesania' },
    { value: ProductEnum.Food, label: 'Comida' },
    { value: ProductEnum.Other, label: 'Otro' }
  ];

  return (
    <>
      <SelectInputForm
        type="select"
        label="Tipo de producto"
        placeholder="Tipo"
        tag={Select}
        name="productType"
        id="productType"
        control={control}
        value={selectOptions.filter(x => x.value === productType)[0]}
        onChange={handleProductDescriptionChange}
        errors={errors}
        options={selectOptions}
        errorMessage="Debe selecionar el tipo de producto"
      />
      <Row form>
        <Col>
          <InputForm
            label="Nombre del producto"
            placeholder="Nombre..."
            name="name"
            value={name}
            onChange={handleProductDescriptionChange}
            id="name"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              validate: {
                whitespacesValidation,
                aCharacterValidation
              },
              minLength: {
                value: 3,
                message: 'Debe ser de al menos 3 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <InputForm
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={handleProductDescriptionChange}
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

export default React.memo(LocalForm);
