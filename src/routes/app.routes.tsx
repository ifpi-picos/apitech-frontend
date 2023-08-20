import { useTheme } from "native-base";

import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import HomeSvg from "../assets/home.svg";
import ProfileSvg from "../assets/profile.svg";
import ApiarySvg from "../assets/history.svg";

import { Profile } from "../screens/Profile";
import { Apiary } from "../screens/Apiary";
import { Home } from "../screens/Home";
import { Platform } from "react-native";

type AppRoutes = {
  Início: undefined;
  Perfil: undefined;
  Apiário: undefined;
}
//sao as propriedades das rotas de navegacao da aplicacao.
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[10];

  return(
    <Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray[50],
        
        tabBarStyle: {
          backgroundColor: "#A8D672",
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[7],
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={iconSize} height={iconSize} fill={color} />
          ))
        }}
      />
      <Screen
        name="Apiário"
        component={Apiary}
        options={{
          tabBarIcon: (({ color }) => (
            <ApiarySvg width={iconSize} height={iconSize} fill={color} />
            ))
          }}
      />
          <Screen
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: (({ color }) => (
                <ProfileSvg width={iconSize} height={iconSize} fill={color} />
              ))
            }}
          />
    </Navigator>
    )
}