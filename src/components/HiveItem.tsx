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
        bg="gray.600"
        alignItems="center"
        px={4}
        py={2}
        pr={4}
        rounded="md"
        my={2}
      >
        <VStack flex={1}>
          <Heading fontSize="lg" color="gray.100">Colmeia N°: 0{data.numero}</Heading>
        </VStack>
        <Icon as={<Entypo name="chevron-right" />} color="gray.100" size="lg" />
      </HStack>
    </TouchableOpacity>
  );
}
