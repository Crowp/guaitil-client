import React, { useContext, createRef } from 'react';
import WizardInput from '../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import Select from 'react-select';
import { MemberContext } from '../../../context';

const MemberEditForm = ({ register, errors }) => {
  const { member, handleInputChangeMember } = useContext(MemberContext);
  const {
    person: { gender = '' },
    createdAt
  } = member;
  const selectOptions = [{ value: 'MALE', label: 'Hombre' }, { value: 'FEMALE', label: 'Mujer' }];
  const selectDate = new Date(moment(createdAt));
  return (
    <>
      <WizardInput
        label="Nombre*"
        placeholder="Ricardo"
        name="name"
        id="name"
        value={member['person']}
        onChange={({ target: { name, value } }) => {
          handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
              handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
              handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
          handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
          handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
              handleInputChangeMember({ name: 'person', value: { [name]: value } });
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
            label="Género"
            placeholder="Genero"
            tag={Select}
            name="gender"
            id="gender"
            value={selectOptions.filter(x => x.value === gender)[0]}
            onChange={value => {
              handleInputChangeMember({ name: 'person', value: { ...member.person, gender: value } });
            }}
            innerRef={register({
              required: 'Seleccioné un género'
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
            value={selectDate}
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
            label="Ocupación*"
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
                message: 'Min length 2'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default MemberEditForm;
