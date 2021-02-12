import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

const PriceForm = ({ register, errors }) => {
  const { product, handleInputProductChange } = useContext(ProductContext);

  const onChangeProductPrice = ({ name, value }) => {
    handleInputProductChange({ name: 'productPrice', value: { ...product.productPrice, [name]: value } });
  };

  const { productPrice } = product;
  const { cost, sale } = productPrice;

  return (
    <>
      <Row form>
        <Col>
          <InputForm
            label="Precio costo del producto"
            placeholder="Precio de costo..."
            name="cost"
            value={cost}
            onChange={onChangeProductPrice}
            id="cost"
            type="number"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio'
            })}
            errors={errors}
          />
          <InputForm
            label="Precio de venta"
            placeholder="Precio venta..."
            name="sale"
            value={sale}
            onChange={onChangeProductPrice}
            id="sale"
            type="number"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              validate: {
                validatePrice: value => Number(value) >= Number(cost) || 'Precio venta debe ser mayor que precio costo'
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
