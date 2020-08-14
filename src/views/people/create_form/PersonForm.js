import React, { Fragment, useContext } from 'react';
import WizardInput from './WizardInput';
import { Col, CustomInput, Row } from 'reactstrap';
import { PersonContext } from '../../context';

const PersonForm = ({ register, errors, watch }) => {
  const { person, handleInputChangePerson } = useContext(PersonContext);
  return (
    <Fragment>
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
            placeholder="Sandoval"
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
            placeholder="Morataya"
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
          required: 'Email is required',
          pattern: {
            value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
            message: 'Email must be valid'
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
            label="Seleccioné un generó"
            placeholder="Genero"
            tag={CustomInput}
            name="gender"
            id="gender"
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
            }}
            innerRef={register({
              required: true
            })}
            errors={errors}
            options={['Male', 'Female']}
          />
        </Col>
      </Row>
      <Row form>
        <Col>
          <WizardInput
            type="password"
            label="Password*"
            placeholder="Password"
            id="password"
            name="password"
            value={person}
            onChange={({ target }) => {
              handleInputChangePerson(target);
            }}
            innerRef={register({
              required: 'You must specify a password',
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
            type="password"
            label="Confirm Password*"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            innerRef={register({
              validate: value => value === watch('password') || 'The password do not match'
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default PersonForm;
