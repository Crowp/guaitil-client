import React, { useContext } from 'react';
import WizardInput from '../../../../components/WizardInput';
import moment from 'moment';
import { SaleContext } from '../../../../context';

const SaleForm = ({ register, errors }) => {
  const { sale, handleInputChangeSale } = useContext(SaleContext);

  const { saleDate } = sale;
  const selectDate = new Date(moment(saleDate));
  return (
    <>
      <WizardInput
        label="Fecha de venta"
        id="saleDate"
        value={selectDate}
        onChange={handleInputChangeSale}
        customType="datetime"
        name="saleDate"
        placeholder="DD/MM/YYYY"
        innerRef={register({
          required: 'Seleccione la fecha de inscripción'
        })}
        errors={errors}
      />
      <WizardInput
        type="number"
        label="Cantidad del producto a vender"
        name="amountSold"
        id="amountSold"
        value={sale}
        onChange={({ target }) => {
          handleInputChangeSale(target);
        }}
        style={{ resize: 'none' }}
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
    </>
  );
};

export default SaleForm;
