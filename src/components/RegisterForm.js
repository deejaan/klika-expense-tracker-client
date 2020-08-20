import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';
import {
  required,
  validEmail,
  vPassword,
  vFirstAndLastName,
  vPasswordConfirmed,
} from '../validations/registerValidation';

const RegisterForm = ({
  form,
  email,
  password,
  firstName,
  lastName,
  onChangeEmail,
  onChangePassword,
  onChangeFirstName,
  onChangeLastName,
  renderRedirect,
  handleRegister,
  passwordConfirmed,
  onChangePasswordConfirmed,
  loading,
}) => {
  return (
    <div className='col-xl-12 text-center'>
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />

        <Form onSubmit={handleRegister} ref={form}>
          <div>
            <div className='form-group'>
              <label htmlFor='firstname'>First name</label>
              <Input
                type='text'
                className='form-control'
                name='firstname'
                value={firstName}
                onChange={onChangeFirstName}
                validations={[required, vFirstAndLastName]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last name</label>
              <Input
                type='text'
                className='form-control'
                name='lastname'
                value={lastName}
                onChange={onChangeLastName}
                validations={[required, vFirstAndLastName]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Input
                type='text'
                className='form-control'
                name='email'
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={onChangePassword}
                validations={[required, vPassword, vPasswordConfirmed]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='passwordconfirmed'>Confirm password</label>
              <Input
                type='password'
                className='form-control'
                name='passwordconfirmed'
                onChange={onChangePasswordConfirmed}
                value={passwordConfirmed}
                validations={[required, vPassword, vPasswordConfirmed]}
              />
            </div>

            <div className='form-group'>
              {renderRedirect()}
              <button className='btn btn-primary btn-block'>Register</button>
              {loading && <Loader className='loader'></Loader>}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  form: PropTypes.elementType,
  email: PropTypes.string,
  password: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  passwordConfirmed: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangePasswordConfirmed: PropTypes.func,
  renderRedirect: PropTypes.func,
  handleRegister: PropTypes.func,
  loading: PropTypes.bool,
};

export default RegisterForm;
