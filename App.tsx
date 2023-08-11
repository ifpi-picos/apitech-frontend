import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider } from 'native-base'; 

import { THEME } from './src/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';


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
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}


