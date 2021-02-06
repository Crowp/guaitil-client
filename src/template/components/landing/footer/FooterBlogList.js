import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FooterBlogList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map((blog, index) => (
      <li key={index}>
        <p className="text-600 opacity-50">
          <Link className="text-600" to="#!">
            {blog.title}
          </Link>
        </p>
        <p className="text-600 opacity-50">{blog.date}</p>
        <p className="font-weight-normal landing-text">{blog.read}</p>
      </li>
    ))}
  </ul>
);
FooterBlogList.propTypes = { list: PropTypes.array.isRequired };

export default FooterBlogList;
