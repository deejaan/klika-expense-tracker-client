import RegisterForm from '../components/RegisterForm.js';
import React, { useState, useRef } from 'react';
import { register } from '../services/auth.service';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastId } from '../constants';
import { validateOk } from '../validations/registerValidation';

const Register = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const notify = (message, type) => {
    if (!toast.isActive(toastId)) {
      if (type === 'success') {
        toast.success(message, { toastId: toastId });
      } else {
        toast.error(message, { toastId: toastId });
      }
    }
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
  };

  const onChangePasswordConfirmed = e => {
    const password = e.target.value;
    setPasswordConfirmed(password);
  };

  const onChangeFirstName = e => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = e => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = e => {
    const username = e.target.value;
    setEmail(username);
  };

  const handleRegister = e => {
    e.preventDefault();
    form.current.validateAll();
    if (validateOk()) {
      setLoading(true);
      register(email, password, firstName, lastName)
        .then(response => {
          setLoading(false);
          notify(
            'User ' +
              response.data.firstName +
              ' ' +
              response.data.lastName +
              ' successfully registered!',
            'success'
          );
          setTimeout(() => {
            setRedirect(true);
          }, 5000);
        })
        .catch(function (error) {
          setLoading(false);
          if (
            error.response.data.error.data.constraint === 'users_email_unique'
          ) {
            notify('Email already exists', 'error');
          } else {
            notify('Something went wrong!', 'error');
          }
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <RegisterForm
        form={form}
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        renderRedirect={renderRedirect}
        handleRegister={handleRegister}
        passwordConfirmed={passwordConfirmed}
        onChangePasswordConfirmed={onChangePasswordConfirmed}
        loading={loading}
      ></RegisterForm>
    </div>
  );
};

Register.propTypes = {};

export default Register;
