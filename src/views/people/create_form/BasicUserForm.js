import React, { Fragment, useContext } from 'react';
import WizardInput from './WizardInput';
import { Col, CustomInput, Row } from 'reactstrap';
import { AuthWizardContext } from '../../../template/context/Context';

const PersonForm = ({ register, errors, watch }) => {
  const { handleInputChange } = useContext(AuthWizardContext);
  return (
    <Fragment>
      <WizardInput
        label="Nombre*"
        placeholder="Ricardo"
        name="name"
        id="name"
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
            name="firstLastName"
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
        innerRef={register({
          required: 'Email is required',
          pattern: {
            value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
            message: 'Email must be valid'
          }
        })}
        errors={errors}
      />
      <WizardInput
        type="number"
        label="Phone"
        placeholder="Phone"
        name="phoneNumber"
        onChange={({ target }) => {
          handleInputChange(target);
        }}
        id="name"
        className="input-spin-none"
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            type="password"
            label="Password*"
            placeholder="Password"
            id="password"
            name="password"
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
      <WizardInput
        type="checkbox"
        id="agreeToTerms"
        tag={CustomInput}
        label={
          <Fragment>
            I accept the <a href="#!"> terms</a> and <a href="#!"> privacy policy</a>
          </Fragment>
        }
        name="agreeToTerms"
        innerRef={register({
          required: 'You have to agree with us'
        })}
        errors={errors}
      />
    </Fragment>
  );
};

export default PersonForm;
