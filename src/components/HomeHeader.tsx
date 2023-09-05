import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export function HomeHeader() {
  return (
      <HStack bg='GREEN' pt={12} pb={5} px={8} alignItems="center">

        <VStack flex={1}>
          <Text color="gray.700" fontFamily="heading" fontSize="lg">
            Olá, Bom dia
          </Text>

          <Heading color="gray.700" fontFamily="heading" fontSize="lg">
            Fulano
          </Heading>
        </VStack>

        <TouchableOpacity onPress={() => {}}>
          <Icon
            as={MaterialIcons}
            name="logout"
            color="RED_MID"
            size={6}
          />
          <Text color="RED_MID">
            Sair
          </Text>
        </TouchableOpacity>
        
      </HStack>
    )
}