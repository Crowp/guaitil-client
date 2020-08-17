import React, { useContext, useState } from 'react';
import WizardInput from './WizardInput';
import { Col, CustomInput, Row } from 'reactstrap';
import { PersonContext } from '../../context';

const PersonForm = ({ register, errors, hasLocal, setHasLocal }) => {
  const [isAssociated, setIsAssociated] = useState(false);
  const { person, handleInputChangePerson } = useContext(PersonContext);
  return (
    <>
      <WizardInput
        label="Nombre*"
        placeholder="Ricardo"
        name="name"
        id="name"
        value={person}
        onChange={({ target }) => {
          handleInputChangePerson(target);
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
            value={person}
            name="firstLastName"
            onChange={({ target }) => {
              handleInputChangePerson(target);
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
            id="lastName"
            name="lastName"
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
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
        label="Email*"
        placeholder="Email"
        id="email"
        name="email"
        value={person}
        onChange={({ target }) => {
          handleInputChangePerson(target);
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
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
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
            tag={CustomInput}
            name="gender"
            id="gender"
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
            }}
            innerRef={register({
              required: 'Seleccioné un genero'
            })}
            errors={errors}
            options={['Male', 'Female']}
          />
        </Col>
      </Row>
      <Row form>
        <Col>
          <WizardInput
            label="Fecha de inscripción"
            id="createAt"
            value={person}
            onChange={handleInputChangePerson}
            customType="datetime"
            name="createAt"
            placeholder="DD/MM/YYYY"
            innerRef={register({
              required: 'Seleccione la fecha de inscripción'
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Ocupasión*"
            placeholder="Trabaja en..."
            name="occupation"
            id="occupation"
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
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
      <Row form>
        <Col>
          <WizardInput
            type="checkbox"
            id="memberType"
            tag={CustomInput}
            label="Es un asociado"
            defaultChecked={isAssociated}
            onChange={({ target: { checked, name } }) => {
              setIsAssociated(checked);
              if (!checked && !hasLocal) {
                setHasLocal(true);
                document.getElementById('hasLocal').checked = true;
              }
              handleInputChangePerson({ name, value: checked ? 'ASSOCIATED' : 'REGULAR' });
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
            defaultChecked={hasLocal}
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

export default PersonForm;
