import React, { useContext } from 'react';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { InputForm } from '../../../../../../components/forms/inputs';
import DatetimeInputFrom from '../../../../../../components/forms/inputs/DatetimeInputForm';
import { SaleContext } from '../../../../../../context';

const SaleForm = ({ register, errors }) => {
  const { sale, handleInputChangeSale } = useContext(SaleContext);

  const { saleDate } = sale;
  return (
    <>
      <DatetimeInputFrom
        id="saleDate"
        name="saleDate"
        label="Fecha de Venta"
        isValidDate={disablePastDt}
        value={saleDate}
        onChange={handleInputChangeSale}
        innerRef={register({
          required: 'Seleccione la fecha de venta'
        })}
        errors={errors}
      />
      <InputForm
        id="amountSold"
        name="amountSold"
        label="Cantidad del producto a vender"
        placeholder="1"
        value={sale}
        type="number"
        onChange={handleInputChangeSale}
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(SaleForm);
