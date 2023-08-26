import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, VStack, Text } from "native-base";

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
              color="gray.700"
            />	
          </TouchableOpacity>

          <HStack justifyContent="space-between" mt={4} mb={6} alignItems="center">

            <Heading fontSize="xl" flexShrink={1}>
              Colmeia(s)
            </Heading>
            <Text textTransform="capitalize" fontSize="md">
              Apiário Principal
            </Text>

          </HStack>
        </VStack>
      </VStack>
    )
}