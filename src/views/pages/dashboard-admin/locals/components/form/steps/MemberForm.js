import React, { useContext } from 'react';
import { selectMembersOptions } from '@/selectors/members/MemberSelectors';
import { LocalContext } from '../../../../../../context';

import { SelectInputForm } from '../../../../../../components/forms/inputs';
import { useMembersState } from '../../../../../../hooks';

const MemberForm = ({ register, errors }) => {
  const { local, handleMemberChange } = useContext(LocalContext);

  const members = useMembersState(selectMembersOptions);
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
