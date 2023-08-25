import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';


type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
}

//sao as propriedades das rotas de navegacao de autentificacao.
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
      <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="signIn"
            component={SignIn}
          />
          
          <Screen
            name="signUp"
            component={SignUp}
          />
      </Navigator>
    )
}