import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

}

export function ApiaryItem({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.100" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="xxl">Principal</Heading>
          <Text fontSize="lg">Lado leste</Text>
          <Text fontSize="lg">Numero de Colmeias: <Text fontSize="xl">002</Text></Text>
          <Text fontSize="lg">Obs.: <Text>...</Text></Text>
        </VStack>
      <Icon 
        as={<Entypo name="chevron-right" />}
        size="lg"
        
      />
      </HStack>
    </TouchableOpacity>  
  )
}