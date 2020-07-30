import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div>
      <div>Navbar</div>
      <div>============</div>
      {/*<Navbar />*/}
      <div>{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
