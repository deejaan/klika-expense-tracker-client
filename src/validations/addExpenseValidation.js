import React from 'react';

let nameOk = false,
  amountOk = false,
  categoryOk = false;

export const validateName = value => {
  console.log(value.length);
  if (value.length < 1 || value.length > 50) {
    nameOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        Name must be between 1 and 50 characters!
      </div>
    );
  } else {
    nameOk = true;
  }
};

export const validateAmount = value => {
  console.log(value.length);
  if (value.length < 1) {
    amountOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!!
      </div>
    );
  } else {
    amountOk = true;
  }
};

export const validateCategory = value => {
  console.log(value.length);
  if (value.length < 1) {
    categoryOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  } else if (value < 0) {
    categoryOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        Amount must be a positive number!
      </div>
    );
  } else {
    categoryOk = true;
  }
};

export const expenseFieldsValidateOk = () => {
  return nameOk && amountOk && categoryOk;
};
