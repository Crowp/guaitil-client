import React, { useContext } from 'react';
import { disableNextDt } from '../../../../../../components/date/handleDisableDate';
import { InputForm } from '../../../../../../components/forms/inputs';
import DatetimeInputFrom from '../../../../../../components/forms/inputs/DatetimeInputForm';
import moment from 'moment';
import { SaleContext } from '../../../../../../context';

const SaleForm = ({ register, errors }) => {
  const { sale, handleInputChangeSale } = useContext(SaleContext);
  const { saleDate, amountSold } = sale;
  const selectDate = new Date(moment(saleDate));
  return (
    <>
      <DatetimeInputFrom
        id="saleDate"
        name="saleDate"
        label="Fecha de Venta"
        isValidDate={disableNextDt}
        value={selectDate}
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
        value={amountSold}
        type="number"
        min="1"
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
