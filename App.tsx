import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { THEME } from './src/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

import { AuthContextPorivder } from './src/contexts/AuthContext';

import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
      />
      <AuthContextPorivder>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextPorivder>
    </NativeBaseProvider>
  );
}


