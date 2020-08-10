import React, { useState, useRef } from 'react';
import LoginForm from '../components/LoginForm.js';
import { login } from '../services/auth.service';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastId } from '../constants';
import { isEmail } from 'validator';

const Login = () => {
  const form = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
    if (redirectToRegister) {
      return <Redirect to='/register' />;
    }
  };
  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    setEmail(email);
  };

  const checkValidity = () => {
    return isEmail(email) && !(password.length < 6 || password.length > 40);
  };

  const handleLogin = e => {
    e.preventDefault();
    form.current.validateAll();
    setLoading(true);
    if (checkValidity()) {
      login(email, password)
        .then(function () {
          setRedirect(true);
          setLoading(false);
        })
        .catch(function () {
          if (!toast.isActive(toastId)) {
            toast.error('Incorrect email or password', { toastId: toastId });
          }
          setLoading(false);
        });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };
  return (
    <div>
      <LoginForm
        form={form}
        email={email}
        password={password}
        renderRedirect={renderRedirect}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        handleLogin={handleLogin}
        loading={loading}
        setRedirectToRegister={setRedirectToRegister}
      ></LoginForm>
    </div>
  );
};

Login.propTypes = {};

export default Login;
