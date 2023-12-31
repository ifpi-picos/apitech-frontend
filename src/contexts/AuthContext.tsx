import { createContext, useEffect, useState } from "react";
import { useToast } from "native-base";

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "../storage/storageAuthToken";
import { storageUserGet, storageUserSave, storageUserRemove } from "../storage/storageUser";

import { api } from "../services/api";
import { UserDTO } from "../dtos/UserDTO";
import { ApiaryDTO } from "../dtos/ApiaryDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>;
  isLoading: boolean;
  isLoadingUserStorageData: boolean;
  apiarys: ApiaryDTO[];
  hive: string[];
  fetchApiarys: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [apiarys, setApiarys] = useState<ApiaryDTO[]>([]);
  const [hive, setHive] = useState<string[]>([])


  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  
  async function userAndTokenUpdate(userData: UserDTO, token: string) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);
  }

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try{
      await storageAuthTokenSave(token);
      await storageUserSave(userData);
    } catch (error) {
      throw error;
    }
  }
  
  
  async function getUserDataWithToken(token: string) {
    try {
      const response = await api.get('/usuarios', { headers: { authorization: `Bearer ${token}` } });
      return response.data; 
    } catch (error) {
      throw error;
    }
  }

  async function singIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const response = await api.post('/login', { email, senha: password });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const userDataResponse = await api.get('/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        userAndTokenUpdate(userDataResponse.data, token);
        await getUserDataWithToken(token);
        await storageUserAndToken(userDataResponse.data, token);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {
        setIsLoading(false);

        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'red.500',
        });
      } else {
        setIsLoading(false);

        toast.show({
          title: 'Ocorreu um erro no servidor.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    }
  }

  async function singOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      setIsLoading(false);


    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        const userData = await getUserDataWithToken(token);
        if (userData) {
          userAndTokenUpdate(userLogged, token);
        }
        setIsLoadingUserStorageData(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  async function fetchApiarys() {
    try {
      setIsLoading(true);

      const response = await api.get('/apiarios');
      setApiarys(response.data);
      if (response.data) {
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {

        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'yellow.700',
        });
      } else {

        toast.show({
          title: 'Ocorreu um erro no servidor.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    }
  }

  // async function fetchHiveByApiarys() {
  //   try{
  //     const response = await api.get(`/apiarios/${apiarys[0].id}/colmeias`);
  //     setHive(response.data);	
      
  //   } catch (error: any) {
  //     if (error.response && error.response.data && error.response.data.mensagem) {

  //       toast.show({
  //         title: error.response.data.mensagem,
  //         placement: 'top',
  //         bgColor: 'red.500',
  //       });
  //     } else {

  //       toast.show({
  //         title: 'Ocorreu um erro no servidor.',
  //         placement: 'top',
  //         bgColor: 'red.500',
  //       });
  //     }
  //   }
  // }

  return (
    <AuthContext.Provider value={{ user, singIn, isLoading, isLoadingUserStorageData, singOut, apiarys, hive, fetchApiarys }}>
      {children}
    </AuthContext.Provider>
  )
}