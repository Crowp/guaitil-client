import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { RoleEnum } from '../../../../../../../constants';
import { selectMembersOptions } from '../../../../../../../selectors/members/MemberSelectors';

import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';
import { UserContext } from '../../../../../../context';
import { useMembersState } from '../../../../../../hooks';

const UserForm = ({ register, errors, watch, isUpdate }) => {
  const { user, handleInputUserChange, handleMemberChange } = useContext(UserContext);
  const members = useMembersState(selectMembersOptions);

  const selectOptions = useMemo(
    () => [
      { value: RoleEnum.SuperAdmin, label: 'Super Administrador' },
      { value: RoleEnum.Admin, label: 'Administrador' }
    ],
    []
  );

  const { password, member, roles = [] } = user;
  return (
    <Row form>
      <Col>
        <InputForm
          id="password"
          type="password"
          name="password"
          label="Contraseña*"
          value={password}
          placeholder="Contraseña..."
          autoComplete="off"
          onChange={handleInputUserChange}
          errors={errors}
          innerRef={register({
            required: isUpdate ? false : 'Debe especificar contraseña',
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
      <Col xs={12}>
        <SelectInputForm
          type="select"
          label="Seleccione el role"
          name="roles"
          id="roles"
          placeholder="Roles..."
          value={selectOptions.filter(x => x.value === roles[0])[0]}
          onChange={({ name, value }) => handleInputUserChange({ name, value: [value] })}
          errors={errors}
          options={selectOptions}
          innerRef={register({
            required: 'Seleccione un role'
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
            placeholder="Seleccione el asociado"
            value={members.filter(x => x.value === member?.id)[0]}
            onChange={handleMemberChange}
            errors={errors}
            options={members}
            innerRef={register({
              required: 'Seleccione el asociado'
            })}
          />
        </Col>
      )}
    </Row>
  );
};

export default UserForm;
