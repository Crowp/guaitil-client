import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import MemberAction from '../../../../stores/member/MemberAction';

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

class ActionFormatter extends Component {
  render() {
    const { dataField, id } = this.props;
    console.log(id);
    return (
      <UncontrolledDropdown>
        <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
          <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
        </DropdownToggle>
        <DropdownMenu right className="border py-2">
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem className="text-danger">Delete</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionFormatter);
