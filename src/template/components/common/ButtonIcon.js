import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonIcon = ({
  tag: Tag = Button,
  icon,
  iconAlign,
  iconClassName = 'd-none d-sm-inline',
  transform,
  children,
  ...rest
}) => (
  <Tag {...rest}>
    {iconAlign === 'right' && children}
    <FontAwesomeIcon
      icon={icon}
      className={classNames(iconClassName, {
        'mr-1': children && iconAlign === 'left',
        'ml-1': children && iconAlign === 'right'
      })}
      transform={transform}
    />
    {iconAlign === 'left' && children}
  </Tag>
);

ButtonIcon.propTypes = {
  ...Button.propTypes,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.any]).isRequired,
  children: PropTypes.any,
  iconAlign: PropTypes.oneOf(['left', 'right']),
  iconClassName: PropTypes.string,
  transform: PropTypes.string
};

ButtonIcon.defaultProps = { iconAlign: 'left' };

export default ButtonIcon;
