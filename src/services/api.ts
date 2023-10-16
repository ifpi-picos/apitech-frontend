import axios, { AxiosInstance } from 'axios';

import { AppError } from '../utils/AppError';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  // Funcao que gerencia a interceptacao do token na aplicacao
  registerInterceptTokenManeger : (signOut: SignOut)  => () => void;
}

const api = axios.create({
  baseURL: 'https://apitech.kamiapp.com.br',
}) as APIInstanceProps;

api.registerInterceptTokenManeger = signOut => {
  const interceptTokenManeger = api.interceptors.request
    .use(response => response, error => {
      if (error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data[0].mensagem));
      } else {
        return Promise.reject(new AppError(error));
      }
  });
  
  return () => {
    api.interceptors.response.eject(interceptTokenManeger);
  };
 
}


export { api };
