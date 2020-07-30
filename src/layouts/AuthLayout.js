import React from 'react';
import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthLayout;
