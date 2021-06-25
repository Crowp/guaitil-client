import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Media } from 'reactstrap';
import Calendar from '../common/Calendar';
import StringUtil from '../../../utils/StringUtil';

const EventBadge = ({ text, ...rest }) => <Badge {...rest}>{text}</Badge>;

EventBadge.propTypes = {
  ...Badge.propTypes,
  text: PropTypes.string.isRequired
};

const EventSummary = ({ calendar, title, badge, organizer, location, divider, to, children }) => {
  return (
    <Media>
      <Calendar {...calendar} />
      <Media body className="position-relative pl-3 text-wrap">
        <h6 className="fs-0 mb-1">
          <Link to={to} className="text-wrap">
            {`${StringUtil.cutWordFromMaxSize(title, 30)}...`}
          </Link>{' '}
          {badge && <EventBadge {...badge} className="ml-1" />}
        </h6>
        <p className="mb-1">
          Organized by{' '}
          <Link to="#!" className="text-700">
            {organizer}
          </Link>
        </p>
        {children}
        {location && <p className="mb-0">{location}</p>}
        {divider && <hr className="border-dashed border-bottom-0" />}
      </Media>
    </Media>
  );
};

EventSummary.propTypes = {
  calendar: PropTypes.shape(Calendar.propTypes).isRequired,
  title: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  badge: PropTypes.shape(EventBadge.propTypes),
  location: PropTypes.string,
  children: PropTypes.node,
  divider: PropTypes.bool
};

EventSummary.defaultProps = { divider: true };

export default EventSummary;
