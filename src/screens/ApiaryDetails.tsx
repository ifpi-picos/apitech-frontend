import { TouchableOpacity } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Radio,
  ScrollView,
  FlatList
} from "native-base";
import { Center } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { Flex } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ApiaryItem } from "../components/ApiaryItem";
import { HiveItem } from "../components/HiveItem";

export function ApiaryDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [hive, setHive] = useState(['teste'])

  function handleGoBack() {
    navigation.navigate("Apiário");
  }
  function handleOpenApiaryDetails() {
    navigation.navigate('Hive');
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="GREEN" pt={8} rounded="xl">
        <HStack alignItems="center">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" size={8} color="gray.700" />
          </TouchableOpacity>
          <Heading mx="auto" fontFamily="heading" fontSize="xl" flexShrink={1}>
            Colmeia(s)
          </Heading>
        </HStack>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={4}
          alignItems="center"
        >
          <HStack
            flex={1}
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Text textTransform="capitalize" fontSize="md">
              Apiário Principal
            </Text>
            <Text fontSize="lg" ml={2}>
              Total Colmeias: {hive.length}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <Center my={5}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 8,
            padding: 12,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HStack justifyContent="center" alignItems="center">
            <Icon as={Entypo} name="plus" color="gray.700" size={8} />
            <Heading fontSize="lg">Adicionar Colmeia</Heading>
          </HStack>
        </TouchableOpacity>
      </Center>
      <FlatList 
          px={8}
          data={hive}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <HiveItem
             onPress={handleOpenApiaryDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          contentContainerStyle={ hive.length === 0 && { flex: 1, justifyContent: "center" } }
          ListEmptyComponent={() => (
            <Text fontSize="lg" textAlign="center">Nenhuma Colmeia cadastrada</Text>
          )
          }
        />
    </VStack>
  );
}
