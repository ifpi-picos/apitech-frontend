import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Center, Text, VStack, Icon, Heading, HStack, FlatList, useToast, Spinner } from "native-base";
import { Entypo } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from "../routes/app.routes"

import { ScreenHeader } from "../components/ScreenHeader";
import { ApiaryItem } from "../components/ApiaryItem";
import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { useIsFocused } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";


export function Apiary() {
  const toast = useToast();

  const route = useRoute();
  const [showLoading, setShowLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(7);

  const { apiarys, fetchApiarys, user, isLoadingApiarys, hive } = useAuth();

  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  // const { usuarioId } = route.params as AddApiaryParamsProps;

  

  const loadMoreItems = () => {
    const increment = 7; // Quantidade de itens a serem adicionados
    setVisibleItems((prevVisibleItems) => prevVisibleItems + increment);
  };

  function handleOpenApiaryDetails(apiaryID: number) {
    navigation.navigate('Apiario_Detalhes', { apiaryID });
    setLoading(!loading);
  }

  function handleAddApiary(usuarioId: number) {
    navigation.navigate('Adicionando_Apiario', { usuarioId });
  }

  useEffect(() => {
    fetchApiarys();
    setShowLoading(true);
  }, []);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Apiários">
        <Center>
          <TouchableOpacity
            onPress={() => handleAddApiary(user.id)}
            style={{
              borderWidth: 2,
              borderColor: 'gray',
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 4,
              width: 'auto',
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
              <Heading fontFamily="heading" fontSize="lg" textAlign="center">Adicionar Apiário</Heading>
            </HStack>
          </TouchableOpacity>
        </Center>

      </ScreenHeader>

      <VStack flex={1} pt={4} px={isVertical ? 8 : 32}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading fontFamily="heading" fontSize="lg">Meus Apiários</Heading>
          <Text fontSize="lg" ml={2}>
            Total:{' '}
            {isLoadingApiarys ? (
              <HStack space={8} px={2} flex={1} justifyContent="center" alignItems="center">
                <Spinner color="emerald.500" size="sm" />
              </HStack>
            ) :
              <Text fontFamily="heading">
                {apiarys.length < 10 ? `0${apiarys.length}` : apiarys.length}
              </Text>
            }
          </Text>
        </HStack>



        {isLoadingApiarys ? (<HStack space={8} flex={1} justifyContent="center" alignItems="center">
          <Spinner color="emerald.500" size="lg" />
          <Text color="emerald.500" fontSize="lg">Carregando...</Text>
        </HStack>) :
          (
            <FlatList
              data={apiarys.slice(0, visibleItems)} // Mostra apenas os itens até visibleItems
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ApiaryItem
                  key={item.id}
                  data={item}
                  onPress={() => handleOpenApiaryDetails(item.id)}
                  // onEdit={() => {}}
                  // onDelete={()=>{}}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                // Mostra o botão para carregar mais itens se houver mais para carregar
                apiarys.length > visibleItems && (
                  <Center my={4}>
                    <TouchableOpacity onPress={loadMoreItems}>
                      <Text color="emerald.500" fontSize="lg">Carregar mais...</Text>
                    </TouchableOpacity>
                  </Center>
                ) || <></>
              )}
              // Restante das propriedades do FlatList
            />
          )}
        </VStack>
    </VStack>
  )
};