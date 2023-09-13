import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Text, VStack, Icon, Heading, HStack, FlatList, useToast } from "native-base";
import { Entypo } from '@expo/vector-icons'; 

import { AppNavigatorRoutesProps } from "../routes/app.routes"

import { ScreenHeader } from "../components/ScreenHeader";
import { ApiaryItem } from "../components/ApiaryItem";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";



export function Apiary() {
  const toast = useToast();

  const { apiarys, fetchApiarys } = useAuth();


  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenApiaryDetails() {
    navigation.navigate('Apiario_Detalhes');
  }

  useEffect(() => {
    fetchApiarys();
  }, []);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Apiário" />

      <Center my={5}>
        <TouchableOpacity
          onPress={() => { }}
          style={{
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
            padding: 12,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HStack justifyContent="center" alignItems="center">
            <Icon
              as={Entypo}
              name="plus"
              color="gray.700"
              size={8} />
            <Heading fontFamily="heading" fontSize="lg">Adicionar Apiário</Heading>
          </HStack>
        </TouchableOpacity>
      </Center>

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading fontFamily="heading" fontSize="lg">Meus Apiários</Heading>
          <Text fontSize="lg" ml={2}>
            Total: {apiarys.length}
          </Text>
        </HStack>

        <FlatList 
          data={apiarys}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ApiaryItem
              key={item.id}
              nome={item.nome}
              onPress={handleOpenApiaryDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          contentContainerStyle={ apiarys.length === 0 && { flex: 1, justifyContent: "center" } }
          ListEmptyComponent={() => (
            <Text fontSize="lg" textAlign="center">Nenhum apiário cadastrado</Text>
          )
          }
        />

      </VStack>
      

    </VStack>
  )
};