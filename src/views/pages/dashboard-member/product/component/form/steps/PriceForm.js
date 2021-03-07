import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { ProductContext } from '../../../../../../context';
import { InputForm } from '../../../../../../components/forms/inputs';

const PriceForm = ({ register, errors }) => {
  const { product, handleProductDescriptionChange } = useContext(ProductContext);
  console.log(product);
  const {
    productDescription: { productPrice }
  } = product;
  const { cost, sale } = productPrice;
  console.log(cost);

  const onChangeProductPrice = ({ name, value }) => {
    handleProductDescriptionChange({ name: 'productPrice', value: { ...productPrice, [name]: value } });
  };

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
