import React from 'react';
import { isEmail } from 'validator';
let emailOk = false,
  passwordOk = false,
  firstAndLastNameOk = false,
  passConfirmedOk = false;
export const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};
export const validEmail = value => {
  if (value.length === 0) {
    emailOk = false;
  } else if (!isEmail(value)) {
    emailOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  } else {
    emailOk = true;
  }
};
export const vPassword = value => {
  if (value.length < 6 || value.length > 40) {
    passwordOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  } else {
    passwordOk = true;
  }
};
export const vFirstAndLastName = (value, props, components) => {
  const pattern = new RegExp(/^[a-zA-Z]+$/);
  if (value.length < 3 || value.length > 40) {
    firstAndLastNameOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        The input must be between 3 and 40 characters.
      </div>
    );
  } else if (!pattern.test(value)) {
    firstAndLastNameOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        Only letters.
      </div>
    );
  } else {
    firstAndLastNameOk = true;
  }
  if (
    components['lastname'][0].value.length === 0 ||
    components['firstname'][0].value.length === 0
  ) {
    firstAndLastNameOk = false;
  }
};
export const vPasswordConfirmed = (value, props, components) => {
  if (
    components['passwordconfirmed'][0].value !== components['password'][0].value
  ) {
    passConfirmedOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        Passwords must match.
      </div>
    );
  } else {
    passConfirmedOk = true;
  }
};

export const validateOk = () => {
  return passConfirmedOk && passwordOk && emailOk && firstAndLastNameOk;
};
