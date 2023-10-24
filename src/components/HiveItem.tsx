import { HStack, VStack, Heading, Icon, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { HiveDTO } from "../dtos/HiveDTO";


type Props = TouchableOpacityProps & {
  data: HiveDTO;
}

export function HiveItem({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.100"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        my={3}
      >
        <VStack flex={1}>
          <Heading fontSize="lg">Numero da Colmeia: 0{data.numero}</Heading>
        </VStack>
        <Icon as={<Entypo name="chevron-right" />} size="lg" />
      </HStack>
    </TouchableOpacity>
  );
}
