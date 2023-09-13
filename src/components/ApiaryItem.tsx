import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

  nome: string;
}

export function ApiaryItem({ nome, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.100" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <VStack flex={1}>
          <Heading fontFamily="heading" flex={1} fontSize="xxl">{nome}</Heading>
          <Text fontSize="lg">Numero de Colmeias: 
            <Text fontSize="xl"fontFamily="heading"> 002</Text>
          </Text>
        </VStack>
      <Icon 
        as={<Entypo name="chevron-right" />}
        size="lg"
      />
      </HStack>
    </TouchableOpacity>  
  )
}