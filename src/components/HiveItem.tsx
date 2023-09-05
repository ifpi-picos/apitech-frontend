import { HStack, VStack, Heading, Icon, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons';


type Props = TouchableOpacityProps & {

}

export function HiveItem({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.100"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <VStack flex={1}>
          <Heading fontSize="xxl">Colmeia Produto</Heading>
          <Text fontSize="lg">Numero da Colmeia: 01</Text>
        </VStack>
        <Icon as={<Entypo name="chevron-right" />} size="lg" />
      </HStack>
    </TouchableOpacity>
  );
}
