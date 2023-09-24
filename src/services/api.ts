import axios from 'axios';

import { AppError } from '../utils/AppError';

const api = axios.create({
  baseURL: 'https://apitech.kamiapp.com.br',
});

api.interceptors.request.use(response => response, error => {
  if (error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data[0].mensagem));
  } else {
    return Promise.reject(new AppError(error));
  }
});

export { api };
