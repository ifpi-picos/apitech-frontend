import { TouchableOpacity } from "react-native";
import { Center, Text, VStack, Icon, Heading, HStack, FlatList } from "native-base";
import { Entypo } from '@expo/vector-icons'; 


import { ScreenHeader } from "../components/ScreenHeader";
import { ApiaryItem } from "../components/ApiaryItem";
import { useState } from "react";

export function Apiary() {
  const [apiarys, setApiarys] = useState(["Principal", "maior", "Forte", "Rico"]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Apiário" />

      <Center my={5}>
        <TouchableOpacity
          onPress={() => { }}
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
            <Heading fontSize="lg">Adicionar Apiário</Heading>
          </Center>
        </TouchableOpacity>
      </Center>

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading fontSize="lg">Meus Apiários</Heading>
          <Text fontSize="lg" ml={2}>(2)</Text>
        </HStack>

        <FlatList 
          data={apiarys}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ApiaryItem />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />

      </VStack>
      

    </VStack>
  )
};