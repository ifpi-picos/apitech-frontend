import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Text, VStack, Icon, Heading, HStack, FlatList, useToast, Spinner } from "native-base";
import { Entypo } from '@expo/vector-icons'; 

import { AppNavigatorRoutesProps } from "../routes/app.routes"

import { ScreenHeader } from "../components/ScreenHeader";
import { ApiaryItem } from "../components/ApiaryItem";
import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { useIsFocused } from '@react-navigation/native';


export function Apiary() {
  const toast = useToast();

  const { apiarys, fetchApiarys } = useAuth();

  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenApiaryDetails() {
    navigation.navigate('Apiario_Detalhes');
  }

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      fetchApiarys();
    }
    setLoading(true);
  }, [isFocused]);

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

        {loading ? <HStack space={8} flex={1} justifyContent="center" alignItems="center">
          <Spinner color="emerald.500" size="lg" />
        </HStack> : apiarys.length === 0 ? 
        (
        <VStack flex={1} alignContent="center" justifyContent="center">
          <Text fontSize="lg" textAlign="center" >Nenhum Apiário cadastrado</Text>
        </VStack>
        ) : 
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
        />}

      </VStack>
      

    </VStack>
  )
};