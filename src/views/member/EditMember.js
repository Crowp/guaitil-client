import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import FormEditSteps from './components/edit-member/FormEditSteps';
import Section from '../components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../template/helpers/utils';
import MemberProvider from '../providers/MemberProvider';
import MemberAction from '../../stores/member/MemberAction';

const EditMember = ({
  match: {
    params: { id }
  }
}) => {
  const [member, setMember] = useState({ person: {} });
  const dispatch = useDispatch();
  const { members } = useSelector(state => state);
  useEffect(() => {
    if (isIterableArray(members)) {
      const [memberEdit] = members.filter(m => m.id === Number(id));
      setMember(memberEdit);
    } else {
      dispatch(MemberAction.getMemberById(id));
    }
  }, [members, dispatch]);

  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <MemberProvider defaultMember={member}>
            <FormEditSteps />
          </MemberProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditMember;
