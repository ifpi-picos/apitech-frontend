import { createContext, useState } from "react";

import { UserDTO } from "../dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextPorivderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextPorivder({ children }: AuthContextPorivderProps) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Wisley',
    email: 'wis@email.com'
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}