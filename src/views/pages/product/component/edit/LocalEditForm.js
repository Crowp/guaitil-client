import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../../components/WizardInput';
import LocalAction from '../../../../../stores/local/LocalAction';
import Select from 'react-select';
import { selectLocalsOptions } from '../../../../../selectors/product/ProductSelector';
import { useSelector, useDispatch } from 'react-redux';
import { ProductContext } from '../../../../context';

const LocalForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { product, handleInputChangeProduct } = useContext(ProductContext);

  const [localId, setLocalId] = useState(product.local?.id ?? '');

  const products = useSelector(selectLocalsOptions);

  const localObjetive = useSelector(state => state.locals);

  const [localSelected] = localObjetive.filter(l => l.id === localId);

  console.log(localSelected);
  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);

  useEffect(() => {
    handleInputChangeProduct({
      name: 'local',
      value: localSelected
    });
  }, [localId, localSelected]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione el local"
        placeholder="Seleccione el local"
        tag={Select}
        name="localId"
        id="localId"
        value={products.filter(x => x.value === localId)[0]}
        onChange={({ value = '' }) => {
          setLocalId(value);
        }}
        innerRef={register({
          required: 'Seleccione el miembro'
        })}
        errors={errors}
        options={products}
        isSearchable
      />
    </>
  );
};

export default LocalForm;
