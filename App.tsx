import { View, Text, StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn/Index';
import { NativeBaseProvider } from 'native-base'; 
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  return (
    <NativeBaseProvider>
      <StatusBar 
        translucent
      />
      {fontsLoaded ? ( <Text>Fontes carregadas</Text> ) : <View />}
      <SignIn />
    </NativeBaseProvider>
  );
}


