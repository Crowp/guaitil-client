import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { selectMembersOptions } from '../../../../../../../selectors/members/MemberSelectors';

import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';
import { UserContext } from '../../../../../../context';
import { useMembersState } from '../../../../../../hooks';

const UserForm = ({ errors, control }) => {
  const { user, handleMemberChange } = useContext(UserContext);
  const members = useMembersState(selectMembersOptions);

  const { member } = user;
  return (
    <Row form>
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
    </Row>
  );
};

export default UserForm;
