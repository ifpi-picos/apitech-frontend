import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Center, Text, VStack, Icon, Heading, HStack, FlatList, useToast, Spinner, Box } from "native-base";
import { Entypo } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from "../routes/app.routes"

import { ScreenHeader } from "../components/ScreenHeader";
import { ApiaryItem } from "../components/ApiaryItem";
import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { useIsFocused } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import Pagination from "../components/Pagination";


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

  const [apiarysList, setApiarysList] = useState([]) as any; // Estado para armazenar a lista de apiários
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

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
    setApiarysList(apiarys);
  }, []);

  const handlePaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  const renderApiariesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return apiarys.slice(startIndex, endIndex);
  };

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
        <HStack justifyContent="flex-start" alignItems="center" mb={2}>
          <Heading fontFamily="heading" fontSize="lg">Meus Apiários</Heading>
          <Text fontSize="lg" ml={2}>
            {'( '}Total:{' '}
            {isLoadingApiarys ? (
              <HStack space={8} px={2} flex={1} justifyContent="center" alignItems="center">
                <Spinner color="emerald.500" size="sm" />
              </HStack>
            ) :
              <Text fontFamily="heading">
                {apiarys.length < 10 ? `0${apiarys.length}` : apiarys.length}
              </Text>
            }
            {' )'}
          </Text>
        </HStack>
        <Box mb={4} backgroundColor="gray.100" rounded="md">
          <Pagination 
            // totalPages={10}
            totalPages={Math.ceil(apiarys.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePaginationChange}
          />
        </Box>

        {isLoadingApiarys ? (<HStack space={8} flex={1} justifyContent="center" alignItems="center">
          <Spinner color="emerald.500" size="lg" />
          <Text color="emerald.500" fontSize="lg">Carregando...</Text>
        </HStack>) :
          (
            <FlatList
              // data={apiarys.slice(0, visibleItems)}
              data={renderApiariesForCurrentPage()}
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
              
              // Restante das propriedades do FlatList
            />
          )}
        </VStack>
    </VStack>
  )
};