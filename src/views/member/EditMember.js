import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormEditSteps from './components/edit-member/FormEditSteps';
import Section from '../components/common/Section';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../template/helpers/utils';
import MemberProvider from '../providers/MemberProvider';
import MemberAction from '../../stores/member/MemberAction';
import { hasErrors, selectRawErrors } from '../../selectors/error/ErrorSelector';
import ErrorAction from '../../stores/error/ErrorAction';
import { useHistory } from 'react-router-dom';

const EditMember = ({
  match: {
    params: { id }
  }
}) => {
  const [member, setMember] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const members = useSelector(state => state.members);

  const isRequesting = useSelector(state => selectRequesting(state, [MemberAction.REQUEST_MEMBER_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [MemberAction.REQUEST_MEMBER_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [MemberAction.REQUEST_MEMBER_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(member).length;

  useEffect(() => {
    if (isIterableArray(members)) {
      const [memberEdit] = members.filter(m => m.id === Number(id));
      setMember(memberEdit);
    } else {
      dispatch(MemberAction.getMemberById(id));
    }
  }, [members, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/members');
      dispatch(ErrorAction.removeById(errors[MemberAction.REQUEST_MEMBER_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, errors, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
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
