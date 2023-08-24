import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export function HomeHeader() {
  return (
      <HStack bg='gray.100' pt={16} pb={5} px={8} alignItems="center">

        <VStack flex={1}>
          <Text color="gray.700" fontSize="lg">
            Olá,
          </Text>

          <Heading color="gray.700" fontSize="lg">
            Fulano
          </Heading>
        </VStack>

        <TouchableOpacity onPress={() => {}}>
          <Icon
            as={MaterialIcons}
            name="logout"
            color="gray.700"
            size={7}
          />
        </TouchableOpacity>
        
      </HStack>
    )
}