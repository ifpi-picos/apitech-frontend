import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Profile } from "../screens/Profile";
import { Apiary } from "../screens/Apiary";
import { Home } from "../screens/Home";

type AppRoutes = {
  home: undefined;
  profile: undefined;
  apiary: undefined;
}
//sao as propriedades das rotas de navegacao da aplicacao.
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function AppRoutes() {
  return(
    <Navigator>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="profile"
        component={Profile}
      />
      <Screen
        name="apiary"
        component={Apiary}
      />
    </Navigator>
    )
}