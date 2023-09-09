import { useContext } from "react";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {

  const { colors } = useTheme();
  const { user } = useAuth();


  const theme = DefaultTheme;
  theme.colors.background = colors.white;

  return (
    <Box flex={1} bg="WHITE">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
    )
}