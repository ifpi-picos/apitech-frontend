import { HStack, VStack, Heading, Icon, Text, Box, Center, Flex } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HiveDTO } from "../dtos/HiveDTO";
import { Entypo } from '@expo/vector-icons';


type Props = TouchableOpacityProps & {
  data: HiveDTO;
}

export function HiveItem({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} style={{
      width: '100%',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 4,
      marginBottom: 10,
      backgroundColor: '#2e2d2d',
    }}>
        <HStack px={3} py={2} width="100%" justifyContent="space-evenly" alignItems="center">
          <Text fontSize="xl" color="gray.100" mr={4}>
            Colmeia
          </Text>
          <Heading fontSize="xxl" color="gray.100"> N°: 0{data.numero}</Heading>
          <Icon 
            as={<Entypo  name="chevron-right" />}
            size="lg"
            color="gray.100"
          />
        </HStack>
    </TouchableOpacity>
  );
}
