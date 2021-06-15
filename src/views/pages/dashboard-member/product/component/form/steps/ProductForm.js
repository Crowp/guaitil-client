import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../../../context';
import { ProductEnum } from '../../../../../../../constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

import { whitespacesValidation, onlyLettersPattern } from '../../../../../../components/forms/inputs/validations';

const LocalForm = ({ register, errors, control }) => {
  const {
    product: { productDescription = {} },
    handleProductDescriptionChange
  } = useContext(ProductContext);
  const { productType = '', name, description } = productDescription;

  const selectOptions = useMemo(
    () => [
      { value: ProductEnum.Handicraft, label: 'Artesania' },
      { value: ProductEnum.Food, label: 'Comida' },
      { value: ProductEnum.Other, label: 'Otro' }
    ],
    []
  );
  return (
    <>
      <SelectInputForm
        type="select"
        id="productType"
        label="Tipo de producto"
        placeholder="Tipo"
        name="productType"
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
                whitespacesValidation
              },
              minLength: {
                value: 3,
                message: 'Nombre de producto debe ser mínimo de 3 caracteres'
              },
              maxLength: {
                value: 60,
                message: 'Nombre de producto no puede tener mas de 60 caracteres'
              },
              pattern: {
                value: onlyLettersPattern,
                message: 'No se permiten numeros ni caracteres especiales'
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
          required: 'Campo obligatorio',
          validate: {
            whitespacesValidation
          },
          minLength: {
            value: 100,
            message: 'La descripción del producto debe ser de al menos 100 caracteres'
          },
          maxLength: {
            value: 1000,
            message: 'La descripción no puede tener más de 1000 caracteres'
          }
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(LocalForm);
