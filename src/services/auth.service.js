import axios from 'axios';

import { API_URL } from '../config';

export const register = (email, password, firstName, lastName) => {
  return axios.post(API_URL + '/users', {
    email,
    password,
    firstName: firstName,
    lastName: lastName,
  });
};

export const login = (email, password) => {
  return axios
    .post(API_URL + '/login', {
      email,
      password,
    })
    .then(response => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
