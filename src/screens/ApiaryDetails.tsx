import { TouchableOpacity, useWindowDimensions } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Radio,
  ScrollView,
  FlatList,
  useToast,
  Spinner,
} from "native-base";
import { Center } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ApiaryItem } from "../components/ApiaryItem";
import { HiveItem } from "../components/HiveItem";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { ApiaryDTO } from "../dtos/ApiaryDTO";
import { HiveDTO } from "../dtos/HiveDTO";

type RouteParamsProps = {
  apiaryID: number;
}

export function ApiaryDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiaryData, setApiaryData] = useState<ApiaryDTO>({} as ApiaryDTO);
  const [hideData, setHideData] = useState<ApiaryDTO>({} as ApiaryDTO);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { apiarys, hive, setApiarys, setHive } = useAuth();
  console.log(apiaryData)
  const route = useRoute();
  const toast = useToast();


  const { apiaryID } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.navigate("Apiário");
  }

  async function fetchApiaryDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/colmeias?apiarioId=${apiaryID}`);
      setHive(response.data);
      console.log(response.data);


    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {

        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'yellow.700',
        });
      } else {

        toast.show({
          title: 'Ocorreu um erro no servidor.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  async function createHive(data: number) {
    try {
      setIsLoading(true);
      const response = await api.post(`/colmeias`, { apiarioId: data});
      if(response.status === 201) {
        setHive([...hive, response.data]);
        console.log(response.data)
        toast.show({
          title: 'Colmeia criada com sucesso!',
          placement: 'top',
          bgColor: 'green.500',
        });
      } 


    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {

        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'yellow.700',
        });
      } else {

        toast.show({
          title: 'Ocorreu um erro no servidor.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenApiaryDetails() {
    navigation.navigate('Hive');
  }
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  useEffect(() => {
    fetchApiaryDetails();
    apiarys.forEach(apiary => {
      if (apiary.id === apiaryID) {
        setApiaryData(apiary);
      }
    })
  }, [apiaryID]);

  return (
    <VStack flex={1}>
      <VStack px={isVertical ? 8 : 32} bg="GREEN" pt={isVertical ? 8 : 4} rounded="xl">
        <HStack alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" size={8} color="gray.700" />
          </TouchableOpacity>
          <Heading fontFamily="heading" fontSize="xl" flexShrink={1}>
            Colmeia(s)
          </Heading>
          <Center my={4}>

            <TouchableOpacity
              onPress={() => createHive(apiaryID)}
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
            mb={6}
          >
            <Text textTransform="capitalize" fontSize="md">
              Apiário:{' '}
                {isLoading ? (
                  <HStack space={8} flex={1} justifyContent="center" alignItems="center">
                    <Spinner color="emerald.500" size="sm" />
                  </HStack> 
                ) :
              <Text fontFamily="heading" fontSize="lg">
                {apiaryData.nome}
              </Text>
                }
            </Text>
            <Text fontSize="lg" ml={2}>
              Total Colmeias: {' '}
                {isLoading ? (
                  <HStack space={8} flex={1} justifyContent="center" alignItems="center">
                    <Spinner color="emerald.500" size="sm" />
                  </HStack> 
                ) :
              <Text fontFamily="heading">
                 <Text fontFamily="heading">
                   {hive.length < 10 ? `0${hive.length}` : hive.length}
                 </Text>
              </Text>
                }
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <VStack px={isVertical ? 0 : 20}>

        {isLoading ? (
          <HStack space={8} pt={32} flex={1} justifyContent="center" alignItems="center">
            <Spinner color="emerald.500" size="lg" />
          </HStack> 
        ) :
        <FlatList
          px={8}
          py={4}
          data={hive}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HiveItem
              onPress={() => handleOpenApiaryDetails}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          contentContainerStyle={hive.length === 0 &&  { flex: 1, justifyContent: "center" }}
          ListEmptyComponent={() => (
            <Text fontSize="lg" textAlign="center">Nenhuma Colmeia cadastrada</Text>
            )
          }
          />
        }
      </VStack>
    </VStack>
  );
}
