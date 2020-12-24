import React, { useContext } from 'react';
import WizardInput from '../../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../context';

const PriceForm = ({ register, errors }) => {
  const { product, handleInputChangeProduct } = useContext(ProductContext);

  const { productPrice } = product;

  const onChangePrice = (name, value) => {
    handleInputChangeProduct({ name: 'productPrice', value: { ...productPrice, [name]: value } });
  };

  return (
    <>
      <Row form>
        <Col>
          <WizardInput
            label="Precio Producto"
            placeholder="Precio..."
            name="cost"
            value={productPrice}
            onChange={({ target: { name, value } }) => {
              onChangePrice(name, value);
            }}
            id="cost"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 3,
                message: 'Debe ser de al menos 3 caracteres'
              }
            })}
            errors={errors}
          />
          <WizardInput
            label="Cantidad vendida"
            placeholder="Cantidad vendida..."
            name="sale"
            value={productPrice}
            onChange={({ target: { name, value } }) => {
              onChangePrice(name, value);
            }}
            id="sale"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 3,
                message: 'Debe ser de al menos 3 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(PriceForm);
