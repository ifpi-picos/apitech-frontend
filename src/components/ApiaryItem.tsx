import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons';
import { ApiaryDTO } from "../dtos/ApiaryDTO";

type Props = TouchableOpacityProps & {
  data: ApiaryDTO;
  numberHives: number;
}

export function ApiaryItem({ data, numberHives, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.600" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <VStack flex={1}>
          <Heading fontFamily="heading" color="gray.100" flex={1} fontSize="xxl">{data.nome}</Heading>
          <Text fontSize="lg" color="gray.100">Numero de Colmeias: 
            <Text fontSize="xl"fontFamily="heading" color="gray.100"> 0{numberHives}</Text>
          </Text>
        </VStack>
      <Icon 
        as={<Entypo  name="chevron-right" />}
        size="lg"
        color="gray.100"
      />
      </HStack>
    </TouchableOpacity>  
  )
}