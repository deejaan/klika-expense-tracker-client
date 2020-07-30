import Axios from 'axios';
import qs from 'qs';

import { API_URL as API } from '../config';

const axios = () => {
  const client = Axios.create({
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    paramsSerializer: params => {
      return qs.stringify(params);
    },
  });

  client.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return request;
  });

  return client;
};
const instance = axios();

export default instance;
