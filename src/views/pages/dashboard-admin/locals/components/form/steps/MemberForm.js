import React, { useContext } from 'react';
import { selectMembersOptions } from '@/selectors/members/MemberSelectors';
import { useSelector } from 'react-redux';
import { LocalContext } from '../../../../../../context';

import { SelectInputForm } from '../../../../../../components/forms/inputs';

const MemberForm = ({ register, errors }) => {
  const { local, handleMemberChange } = useContext(LocalContext);

  const members = useSelector(selectMembersOptions);
  const { member } = local;

  return (
    <SelectInputForm
      type="select"
      label="Seleccione el miembro"
      name="member"
      id="member"
      placeholder="Seleccione el miembro"
      value={members.filter(x => x.value === member.id)[0]}
      onChange={handleMemberChange}
      errors={errors}
      options={members}
      innerRef={register({
        required: 'Seleccione el miembro'
      })}
    />
  );
};

export default React.memo(MemberForm);
