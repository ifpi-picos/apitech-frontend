import { TouchableOpacity } from "react-native";
import { Icon, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

import { Feather } from '@expo/vector-icons';

export function ApiaryDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.navigate('Apiário');
  }

  return (
      <VStack flex={1}>
        <VStack
          px={8}
          bg="GREEN"
          pt={12}
          rounded="xl"
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Icon 
              as={Feather}
              name="arrow-left"
              size={8}
              color="gray.300"
            />	
          </TouchableOpacity>
        </VStack>
      </VStack>
    )
}