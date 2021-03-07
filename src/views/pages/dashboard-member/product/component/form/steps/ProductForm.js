import React, { useContext } from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../../../context';
import { ProductEnum } from '../../../../../../../constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

const LocalForm = ({ register, errors }) => {
  const {
    product: { productDescription = {} },
    handleProductDescriptionChange
  } = useContext(ProductContext);
  console.log(productDescription);
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
        value={selectOptions.filter(x => x.value === productType)[0]}
        onChange={handleProductDescriptionChange}
        innerRef={register({
          required: 'Seleccione un tipo producto'
        })}
        errors={errors}
        options={selectOptions}
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
              minLength: {
                value: 2,
                message: 'Debe ser de al menos 2 caracteres'
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
