import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import WizardInput from '../../../../components/WizardInput';
import MemberAction from '../../../../../stores/member/MemberAction';
import Select from 'react-select';
import { selectMembersOptions } from '../../../../../selectors/members/MemberSelectors';
import { selectRequesting } from '../../../../../selectors/requesting/RequestingSelector';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from '../../../../context';
import { RoleEnum } from '../../../../../constants';

const UserForm = ({ register, errors, watch }) => {
  const dispatch = useDispatch();
  const [rolesSelected, setRolesSelected] = useState([]);
  const { user, handleInputChangeUser } = useContext(UserContext);

  const [memberId, setMemberId] = useState(user.member?.id ?? '');

  const selectOptions = [
    { value: RoleEnum.SuperAdmin, label: 'Super Administrador' },
    { value: RoleEnum.Admin, label: 'Administrador' }
  ];

  const members = useSelector(selectMembersOptions);

  const memberObjetive = useSelector(state => state.members);

  const isRequesting = useSelector(state => selectRequesting(state, [MemberAction.REQUEST_MEMBER_WITHOUT_USER]));

  useEffect(() => {
    dispatch(MemberAction.getMembersWithoutUser());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="h-100">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <>
      <Row form>
        <Col>
          <WizardInput
            type="password"
            label="Contraseña*"
            placeholder="Password"
            id="password"
            autoComplete="on"
            name="password"
            value={user}
            onChange={({ target }) => {
              handleInputChangeUser(target);
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
            label="Confirmar Contraseña*"
            placeholder="Repetir"
            id="confirmPassword"
            autoComplete="on"
            value={user}
            name="confirmPassword"
            innerRef={register({
              validate: value => value === watch('password') || 'The password do not match'
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <WizardInput
        type="select"
        label="Seleccione los roles que va a tener este asociado"
        placeholder="Seleccione los roles"
        tag={Select}
        name="locals"
        id="locals"
        value={selectOptions.filter(option => rolesSelected.includes(option.value))}
        onChange={values => {
          const options = values ? values : [];
          const roles = [...options.map(item => item.value)];
          setRolesSelected(roles);
          handleInputChangeUser({
            name: 'roles',
            value: roles
          });
        }}
        innerRef={register({
          required: 'Seleccione al menos un role'
        })}
        errors={errors}
        options={selectOptions}
        isSearchable
        isMulti
        closeMenuOnSelect={false}
      />
      <WizardInput
        type="select"
        label="Seleccione el asociado"
        placeholder="Seleccione el asociado"
        tag={Select}
        name="memberId"
        id="memberId"
        value={members.filter(x => x.value === memberId)[0]}
        onChange={({ value = '' }) => {
          setMemberId(value);
          const [memberSelected] = memberObjetive.filter(x => x.id === value);
          handleInputChangeUser({
            name: 'member',
            value: memberSelected
          });
        }}
        innerRef={register({
          required: 'Seleccione al menos un asociado'
        })}
        errors={errors}
        options={members}
        isSearchable
      />
    </>
  );
};

export default React.memo(UserForm);
