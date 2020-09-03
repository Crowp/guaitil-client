import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../../../components/WizardInput';
import MemberAction from '../../../../stores/member/MemberAction';
import Select from 'react-select';
import { selectMembersOptions } from '../../../../selectors/members/MemberSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { LocalContext } from '../../../context';

const MemberEditForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const { member } = local;

  const [memberId, setMemberId] = useState(member.id);

  const members = useSelector(selectMembersOptions);

  const memberObjetive = useSelector(state => state.members);

  const [memberSelected] = memberObjetive.filter(x => x.id === memberId);

  useEffect(() => {
    dispatch(MemberAction.getMembers());
  }, [dispatch]);

  useEffect(() => {
    handleInputChangeLocal({
      name: 'member',
      value: memberSelected
    });
  }, [memberId, memberSelected, handleInputChangeLocal]);

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

export default MemberEditForm;
