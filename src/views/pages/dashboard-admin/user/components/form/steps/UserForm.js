import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { selectMembersOptions } from '../../../../../../../selectors/members/MemberSelectors';

import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';
import { UserContext } from '../../../../../../context';
import { useMembersState } from '../../../../../../hooks';

const UserForm = ({ register, errors, watch, isUpdate, control }) => {
  const { user, handleInputUserChange, handleMemberChange } = useContext(UserContext);
  const members = useMembersState(selectMembersOptions);

  const { password, member } = user;
  return (
    <Row form>
      <Col>
        <InputForm
          id="password"
          type="password"
          name="password"
          label={isUpdate ? 'Nueva contraseña*' : 'Contraseña*'}
          value={password}
          placeholder="Contraseña..."
          autoComplete="off"
          onChange={handleInputUserChange}
          errors={errors}
          innerRef={register({
            required: 'Debe especificar contraseña',
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
            }
          })}
        />
      </Col>
      <Col>
        <InputForm
          type="password"
          label="Confirmar Contraseña*"
          placeholder="Repetir"
          id="confirmPassword"
          autoComplete="on"
          name="confirmPassword"
          errors={errors}
          innerRef={register({
            validate: value => value === watch('password') || 'La contraseña no coincide'
          })}
        />
      </Col>
      {!isUpdate && (
        <Col xs={12}>
          <SelectInputForm
            type="select"
            label="Seleccione el asociado"
            name="member"
            id="member"
            control={control}
            placeholder="Seleccione el asociado"
            value={members.filter(x => x.value === member?.id)[0]}
            onChange={handleMemberChange}
            errors={errors}
            options={members}
            errorMessage="Debe seleccionar el asociado"
          />
        </Col>
      )}
    </Row>
  );
};

export default UserForm;
