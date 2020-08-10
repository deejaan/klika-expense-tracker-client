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
