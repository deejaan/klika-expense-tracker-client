import axios from '../client/axiosClient';

import { API_URL } from '../config';

export const expenses = () => {
  return axios.get(API_URL + '/expenses').then(response => {
    return response.data.expenses;
  });
};

export const deleteExpense = id => {
  return axios.delete(API_URL + '/expenses/' + id).then(response => {
    return response;
  });
};

export const addExpense = (name, amount, description, categoryId) => {
  return axios
    .post(API_URL + '/expenses', {
      name,
      amount,
      description,
      categoryId,
    })
    .then(response => {
      return response;
    });
};
