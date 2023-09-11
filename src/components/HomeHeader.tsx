import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";


export function HomeHeader() {
  const { user, singOut } = useAuth();

  return (
      <HStack bg='GREEN' pt={12} pb={5} px={8} alignItems="center">

        <VStack flex={1}>
          <Text color="gray.700" fontFamily="body" fontSize="lg">
            Olá, Bom dia
          </Text>

          <Heading color="gray.700" fontFamily="heading" textTransform="capitalize" fontSize="lg">
            {user.nome}
          </Heading>
        </VStack>

        <TouchableOpacity onPress={singOut}>
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