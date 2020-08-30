import React, { useContext, useState } from 'react';
import WizardInput from '../../../components/WizardInput';
import { Col, CustomInput, Row } from 'reactstrap';
import Select from 'react-select';
import { MemberContext } from '../../../context';
import { GenderEnum } from '../../../../constants';

const MemberForm = ({ register, errors, hasLocal, setHasLocal }) => {
  const [isAssociated, setIsAssociated] = useState(false);
  const { member, handleInputChangeMember } = useContext(MemberContext);
  const { gender = '', createdAt } = member;
  const selectOptions = [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }];

  const onChangePerson = (name, value) => {
    handleInputChangeMember({ name: 'person', value: { ...member.person, [name]: value } });
  };
  return (
    <>
      <WizardInput
        label="Nombre*"
        placeholder="Ricardo"
        name="name"
        id="name"
        value={member['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'Min length 2'
          }
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Primer Apellido*"
            placeholder="Morataya"
            id="firstLastName"
            name="firstLastName"
            value={member['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Password must have at least 2 characters'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Segundo Apellido"
            placeholder="Sandoval"
            id="secondLastName"
            name="secondLastName"
            value={member['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Password must have at least 2 characters'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <WizardInput
        label="Cedula*"
        placeholder="901110534"
        id="id"
        name="id"
        value={member['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 8,
            maximum: 12,
            message: 'La cedula debe tener entre 8 y 12 caracteres'
          }
        })}
        errors={errors}
      />
      <WizardInput
        label="Email*"
        placeholder="Email"
        id="email"
        name="email"
        value={member['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          pattern: {
            value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
            message: 'Email debe ser valido'
          }
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Número de telefono*"
            placeholder="Telefono"
            id="telephone"
            name="telephone"
            value={member['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'EL número de telefono debe ser de al menos de 8 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            type="select"
            label="Generó"
            placeholder="Genero"
            tag={Select}
            name="gender"
            id="gender"
            value={selectOptions.filter(x => x.value === gender)[0]}
            onChange={({ value }) => {
              onChangePerson('gender', value);
            }}
            innerRef={register({
              required: 'Seleccione un genero'
            })}
            errors={errors}
            options={selectOptions}
          />
        </Col>
      </Row>
      <Row form>
        <Col>
          <WizardInput
            label="Fecha de inscripción"
            id="createdAt"
            value={createdAt}
            onChange={handleInputChangeMember}
            customType="datetime"
            name="createdAt"
            placeholder="DD/MM/YYYY"
            innerRef={register({
              required: 'Seleccione la fecha de inscripción'
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Ocupasion*"
            placeholder="Trabaja en..."
            name="occupation"
            id="occupation"
            value={member}
            onChange={({ target }) => {
              handleInputChangeMember(target);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Debe tener dos letras como minimo'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <Row form>
        <Col>
          <WizardInput
            type="checkbox"
            id="memberType"
            tag={CustomInput}
            label="Es un asociado"
            checked={isAssociated}
            onChange={({ target: { checked, name } }) => {
              setIsAssociated(checked);
              if (!checked && !hasLocal) {
                setHasLocal(true);
              }
              handleInputChangeMember({ name, value: checked ? 'ASSOCIATED' : 'REGULAR' });
            }}
            name="memberType"
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            type="checkbox"
            id="hasLocal"
            tag={CustomInput}
            label="Tiene un local"
            disabled={!isAssociated}
            checked={hasLocal}
            onChange={({ target: { checked } }) => {
              setHasLocal(checked);
            }}
            name="hasLocal"
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default MemberForm;
