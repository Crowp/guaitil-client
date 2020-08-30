import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../components/WizardInput';
import Select from 'react-select';
import { selectMembersOptions } from '../../selectors/members/MemberSelectors';
import { useSelector } from 'react-redux';
import { LocalContext } from '../context';

const MemberForm = ({ register, errors }) => {
  const { handleInputChangeLocal } = useContext(LocalContext);

  const [memberId, setMemberId] = useState('');
  const members = useSelector(selectMembersOptions);

  const memberObjetive = useSelector(state => state.members);
  const [memberSelected] = memberObjetive.filter(x => x.id === memberId);

  useEffect(() => {
    handleInputChangeLocal({
      name: 'member',
      value: memberSelected
    });
  }, [memberId]);

  return (
    <>
      <WizardInput
        type="select"
        label="Seleccione el miembro"
        placeholder="Seleccione el miembro"
        tag={Select}
        name="memberId"
        id="memberId"
        value={members.filter(x => x.value === memberId)[0]}
        onChange={({ value = '' }) => {
          setMemberId(value);
        }}
        innerRef={register({
          required: 'Seleccione el miembro'
        })}
        errors={errors}
        options={members}
        isSearchable
      />
    </>
  );
};

export default MemberForm;
