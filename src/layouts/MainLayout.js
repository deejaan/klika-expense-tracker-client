import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth.service';
import Logo from '../assets/img/logo.png';

const MainLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  const setUser = user => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/home'} className='navbar-brand'>
          <img
            src={Logo}
            alt='Klika'
            style={{ width: '2em', height: '2em' }}
          ></img>
        </Link>
        <div className='navbar-nav mr-auto '>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link active'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/'} className='nav-link'>
              Statistics
            </Link>
          </li>
        </div>
        <div className='text-secondary mr-4 '>{currentUser.email}</div>
        <a
          href='/login'
          className='text-secondary float-right'
          onClick={logout}
        >
          Logout
        </a>
      </nav>
      {/*<Navbar />*/}
      <div>{children}</div>
      <footer className='bg-primary p-1 text-light text-center fixed-bottom'>
        Klika Expense Tracker
      </footer>
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
