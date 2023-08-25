import { TouchableOpacity } from "react-native";
import { Center, Text, VStack, Icon, Heading } from "native-base";
import { Entypo } from '@expo/vector-icons'; 

import { Button } from "../components/Button";
import { ScreenHeader } from "../components/ScreenHeader";

export function Apiary() {
  return (
  <VStack flex={1}>
    <ScreenHeader title="Apiário(s)" />

    <Center my={5}>
      <TouchableOpacity 
        onPress={() => {}}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          padding: 16,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Center>
            <Icon
              as={Entypo}
              name="plus"
              color="gray.700"
              size={8} />
            <Heading fontSize="md">Adicionar Apiário</Heading>
          </Center>
        </TouchableOpacity>
      </Center>  


  </VStack>
  )
};