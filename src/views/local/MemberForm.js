import React, { useContext, useState, useEffect } from 'react';
import WizardInput from '../components/WizardInput';
import { isIterableArray } from '../../template/helpers/utils';
import MemberAction from '../../stores/member/MemberAction';
import Select from 'react-select';
import { selectMembersOptions } from '../../selectors/members/MemberSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { LocalContext } from '../context';

const MemberForm = ({ register, errors }) => {
  const dispatch = useDispatch();

  const [memberElected, setMemberElected] = useState({});

  const { handleInputChangeLocal } = useContext(LocalContext);

  const [memberId, setMemberId] = useState('');

  const members = useSelector(selectMembersOptions);

  const memberObjetive = useSelector(state => state.members);

  useEffect(() => {
    if (isIterableArray(members)) {
      const [memberSelected] = memberObjetive.filter(x => x.id === memberId);
      setMemberElected(memberSelected);
    } else {
      dispatch(MemberAction.getMembers());
    }
  }, []);

  useEffect(() => {
    handleInputChangeLocal({
      name: 'member',
      value: memberElected
    });
  }, [memberId, members]);

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
