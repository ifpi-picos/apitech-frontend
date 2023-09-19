import { TouchableOpacity, useWindowDimensions } from "react-native";
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

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ApiaryItem } from "../components/ApiaryItem";
import { HiveItem } from "../components/HiveItem";
import { useAuth } from "../hooks/useAuth";

export function ApiaryDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { apiarys, hive } = useAuth();


  function handleGoBack() {
    navigation.navigate("Apiário");
  }
  function handleOpenApiaryDetails() {
    navigation.navigate('Hive');
  }
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical


  return (
    <VStack flex={1}>
      <VStack  px={isVertical ? 8 : 32} bg="GREEN" pt={isVertical ? 12 : 4} rounded="xl">
        <HStack alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" size={8} color="gray.700" />
          </TouchableOpacity>
          <Heading fontFamily="heading" fontSize="xl" flexShrink={1}>
            Colmeia(s)
          </Heading>
          <Center my={5}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 999,
            padding: 8,
            width: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HStack justifyContent="center" alignItems="center">
            <Icon as={Entypo} name="plus" color="gray.700" size={8} />
            {isVertical ? <></> : <Heading fontSize="lg">Adicionar Colmeia</Heading>}
            {/* <Heading fontSize="lg">Adicionar Colmeia</Heading> */}
          </HStack>
        </TouchableOpacity>
      </Center>
        </HStack>
        <HStack
          justifyContent="space-between"
          mt={isVertical ? 0 : -2}
          alignItems="center"
        >
          <HStack
            flex={1}
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Text textTransform="capitalize" fontSize="md">
              Apiário:{' '} 
              <Text fontFamily="heading" fontSize="lg">
                {apiarys[0].nome}
              </Text> 
            </Text>
            <Text fontSize="lg" ml={2}>
              Total Colmeias: <Text fontFamily="heading">{hive.length}</Text>
            </Text>
          </HStack>
        </HStack>
      </VStack>
     
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
