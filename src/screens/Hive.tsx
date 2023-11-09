import { Flex, Center, VStack, Radio, Text, HStack, Icon, Heading, Spinner, Box, Divider, useToast } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { HiveDTO } from "../dtos/HiveDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Button } from "../components/Button";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { api } from "../services/api";

type RouteParamsProps = {
  hiveID: number;
}

type HiveStateProps = {
  
  estadoCriaNova?: {
    localizada: number | "" | undefined;
    quantidade?: number | "" | undefined;
    estado?: number | "" | undefined;
  }
  estadoCriaMadura?: {
      localizada: number | "" | undefined;
      quantidade?: number | "" | undefined;
      estado?: number | "" | undefined;
  }
  estadoMel?: {
      localizada: number | "" | undefined;
      quantidade?: number | "" | undefined;
      estado?: number | "" | undefined;
  }
  estadoPolen?: {
      localizada: number | "" | undefined;
      quantidade?: number | "" | undefined;
  }
  estadoRainha?: {
      localizada: number | "" | undefined;
      estado?: number | "" | undefined;
      aspecto?: number | "" | undefined;
  }
}

export function Hive() {
  const [isLoading, setIsLoading] = useState(true);
  const [hiveData, setHiveData] = useState<HiveDTO>({} as HiveDTO);
  const windowDimensions = useWindowDimensions();

  const [radioValues, setRadioValues] = useState({
    novasCriaLocalizada: "",
    quantidadeDeCria: "",
    estadoDaCriaNova: "",
    criaMadurasLocalizada: "",
    quantidadeDeCriaMaduras: "",
    estadoDasCriasMaduras: "",
    melLocalizado: "",
    quantidadeDeMel: "",
    estadoDoMel: "",
    polenLocalizado: "",
    quantidadeDePolen: "",
    rainhaLocalizada: "",
    idadeDaRainha: "",
    estadoDaRainha: "",
  });

  const [listaDeValores, setListaDeValores] = useState([]);

  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  
  const { hive, setHive } = useAuth();
  const { hiveID } = route.params as RouteParamsProps;
  const toast = useToast();
  
  function handleGoBack(apiaryID: number) {
    navigation.navigate("Apiario_Detalhes", { apiaryID });
  }
  
  useEffect(() => {

    hive.forEach(item => {
      try {
        if (item.id === hiveID) {
          api.get(`/colmeias/${hiveID}`)
            .then(response => {
              setHiveData(response.data)
              // console.log(response.data)
            })
        }
        
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.mensagem) {
  
          toast.show({
            title: error.response.data.mensagem,
            placement: 'top',
            bgColor: 'red.500',
          });
        } else {
  
          toast.show({
            title: 'Ocorreu um erro no servidor.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
      }
    })
      
      
  }, [hiveID]);
  
  async function getHiveData() { 
    await api.get(`/colmeias/${hiveID}`)
    .then(response => {
      // setHiveData(response.data)
      // console.log(response.data)
    })
  }

   function handleRadioChange(name: string, value: any) {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
   }


  

   

  function handleSaveRevisao() {
    // console.log(radioValues)
    setHiveData({
      ...hiveData,
      estadoCriaNova: {
        localizada: radioValues.novasCriaLocalizada as any,
        quantidade: radioValues.quantidadeDeCria  as any,
        estado: radioValues.estadoDaCriaNova  as any,
      },
      estadoCriaMadura: {
        localizada: radioValues.criaMadurasLocalizada  as any,
        quantidade: radioValues.quantidadeDeCriaMaduras  as any,
        estado: radioValues.estadoDasCriasMaduras  as any,
      },
      estadoMel: {
        localizada: radioValues.melLocalizado  as any,
        quantidade: radioValues.quantidadeDeMel  as any,
        estado: radioValues.estadoDoMel  as any,
      },
      estadoPolen: {
        localizada: radioValues.polenLocalizado  as any,
        quantidade: radioValues.quantidadeDePolen  as any,
      },
      estadoRainha: {
        localizada: radioValues.rainhaLocalizada  as any,
        estado: radioValues.idadeDaRainha  as any,
        aspecto: radioValues.estadoDaRainha  as any,
      },
    });
  console.log(hiveData)
  }

    return (
      <VStack flex={1}>
        <VStack px={isVertical ? 6 : 32} bg="GREEN" pt={isVertical ? 16 : 8} rounded="xl">
          <HStack alignItems="center" py={3} justifyContent="space-between">
            <TouchableOpacity onPress={() => handleGoBack(hiveData.apiarioId)}>
              <Icon as={Feather} name="arrow-left" size={8} color="gray.700" />
            </TouchableOpacity>
            <Text fontSize="lg" flexShrink={1}>
              Colmeia N°: <Heading fontFamily="heading" fontSize="xl">0{hiveData.numero}</Heading>
            </Text>

          </HStack>
          <HStack
            justifyContent="space-between"
            mt={isVertical ? 0 : -2}
            alignItems="center"
          >

          </HStack>
          <Center pb={4}>
            <Heading fontSize="xl">Revisão da Colmeia</Heading>
          </Center>
        </VStack>

        <ScrollView >
        <Center mb={12}>
          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Novas e Ovos</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("novasCriaLocalizada", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              // converter para string
              defaultValue={hiveData.estadoCriaNova?.localizada as any}  
              name="novasCriaLocalizada" 
              accessibilityLabel="Localização de Crias Novas e Ovos">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Não havia crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Cria:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("quantidadeDeCria", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoCriaNova?.quantidade as any}  
              name="quantidadeDeCria" 
              accessibilityLabel="Quantidade de Cria Nova">
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Sem Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Poucas Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Muitas Crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado da Cria Nova:</Text>
            <Radio.Group
              onChange={(value) => handleRadioChange("estadoDaCriaNova", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoCriaNova?.estado as any} 
              name="estadoDaCriaNova" 
              accessibilityLabel="Estado da Cria Nova">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Cria em Ovos
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Cria em Pupas
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Cria em Ovos e Pupas
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Maduras</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("criaMadurasLocalizada", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoCriaMadura?.localizada as any}
              name="criaMadurasLocalizada" 
              accessibilityLabel="Crias Maduras Localizada">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Não havia crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Cria:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("quantidadeDeCriaMaduras", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoCriaMadura?.quantidade as any}
              name="quantidadeDeCriaMaduras" 
              accessibilityLabel="Quantidade de Crias Maduras">
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Sem Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Poucas Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Muitas Crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado das Crias Maduras:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("estadoDasCriasMaduras", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoCriaMadura?.estado as any} 
              name="estadoDasCriasMaduras" 
              accessibilityLabel="Estado das Crias Maduras:">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Maduras Escuras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Maduras Claras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Maduras Claras e Escuras
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Mel no Ninho</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Mel Localizado:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("melLocalizado", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoMel?.localizada as any} 
              name="melLocalizado" 
              accessibilityLabel="Mel Localizado">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Não havia Mel
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Mel:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("quantidadeDeMel", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoMel?.quantidade as any} 
              name="quantidadeDeMel" 
              accessibilityLabel="Quantidade de Mel">
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Sem Mel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Pouco Mel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Muito Mel
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado do Mel:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("estadoDoMel", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoMel?.estado as any} 
              name="estadoDoMel" 
              accessibilityLabel="Estado do Mel">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Mel Maduro
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Mel Verde
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Mel Maduro e Verde
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Pólen no Ninho</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Pólen Localizado:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("polenLocalizado", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoPolen?.localizada as any}
              name="polenLocalizado" 
              accessibilityLabel="Pólen Localizado">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Não havia Pólen
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Pólen:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("quantidadeDePolen", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoPolen?.quantidade as any} 
              name="quantidadeDePolen" 
              accessibilityLabel="Quantidade de Pólen">
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Sem Pólen
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Pouco Pólen
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Muito Pólen
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização da Rainha </Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Rainha Localizada:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("rainhaLocalizada", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoRainha?.localizada as any} 
              name="rainhaLocalizada" 
              accessibilityLabel="Rainha Localizada">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Não havia Rainha
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Idade da Rainha:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("idadeDaRainha", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoRainha?.estado as any}  
              name="idadeDaRainha" 
              accessibilityLabel="Idade da Rainha">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Rainha com Idade Conhecida
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Rainha com Idade Desconhecida
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado da Rainha:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("estadoDaRainha", value)} 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue={hiveData.estadoRainha?.aspecto as any} 
              name="estadoDaRainha" 
              accessibilityLabel="Estado da Rainha">
              
              <Radio colorScheme="emerald" size="lg" value="0" my={1}>
                Rainha Jovem Saudável
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Rainha Jovem Aspecto Mediano
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Rainha Velha Aspecto Não Saudável
              </Radio>
            </Radio.Group>
          </Box>
            <Button
              title="Salvar Revisão"
              w="80%"
              onPress={handleSaveRevisao}
              
            >
            </Button>
          
        </Center>
        </ScrollView>
      </VStack>
    )
}