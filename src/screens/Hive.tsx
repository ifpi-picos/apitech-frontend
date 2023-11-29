import { Flex, Center, VStack, Radio, Text, HStack, Icon, Heading, Spinner, Box, Divider, useToast } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { ColmeiaPreModificacao, HiveDTO } from "../dtos/HiveDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Button } from "../components/Button";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { api } from "../services/api";
import { string } from "yup";
import { set } from "react-hook-form";
import { Loading } from "../components/Loading";

type RouteParamsProps = {
  hiveID: number;
}

export function Hive() {
  const [isLoading, setIsLoading] = useState(true);
  const [hiveData, setHiveData] = useState<HiveDTO>({
    id: 0,
    apiarioId: 0,
    numero: 0,
    estadoCriaNova: {
      localizada: "",
      quantidade: "",
      estado: "",
    },
    estadoCriaMadura: {
      localizada: "",
      quantidade: "",
      estado: "",
    },
    estadoMel: {
      localizada: "",
      quantidade: "",
      estado: "",
    },
    estadoPolen: {
      localizada: "",
      quantidade: "",
    },
    estadoRainha: {
      localizada: "",
      estado: "",
      aspecto: "",
    },
  } as HiveDTO);
  // const [colmeiaPreModificacao, setColmeiaPreModificacao] = useState<ColmeiaPreModificacao>({
  //   estadoCriaNova: {
  //     localizada: hiveData.estadoCriaNova?.localizada,
  //     quantidade: hiveData.estadoCriaNova?.quantidade,
  //     estado: hiveData.estadoCriaNova?.estado,
  //   },
  //   estadoCriaMadura: {
  //     localizada: hiveData.estadoCriaMadura?.localizada,
  //     quantidade: hiveData.estadoCriaMadura?.quantidade,
  //     estado: hiveData.estadoCriaMadura?.estado,
  //   },
  //   estadoMel: {
  //     localizada: hiveData.estadoMel?.localizada,
  //     quantidade: hiveData.estadoMel?.quantidade,
  //     estado: hiveData.estadoMel?.estado,
  //   },
  //   estadoPolen: {
  //     localizada: hiveData.estadoPolen?.localizada,
  //     quantidade: hiveData.estadoPolen?.quantidade,
  //   },
  //   estadoRainha: {
  //     localizada: hiveData.estadoRainha?.localizada,
  //     estado: hiveData.estadoRainha?.estado,
  //     aspecto: hiveData.estadoRainha?.aspecto,
  //   },
  // } as ColmeiaPreModificacao);
  const windowDimensions = useWindowDimensions();

  const [radioValues, setRadioValues] = useState({
    novasCriaLocalizada: hiveData.estadoCriaNova?.localizada,
    quantidadeDeCria: hiveData.estadoCriaNova?.quantidade,
    estadoDaCriaNova: hiveData.estadoCriaNova?.estado,
    criaMadurasLocalizada: hiveData.estadoCriaMadura?.localizada,
    quantidadeDeCriaMaduras: hiveData.estadoCriaMadura?.quantidade,
    estadoDasCriasMaduras: hiveData.estadoCriaMadura?.estado,
    melLocalizado: hiveData.estadoMel?.localizada,
    quantidadeDeMel: hiveData.estadoMel?.quantidade,
    estadoDoMel: hiveData.estadoMel?.estado,
    polenLocalizado: hiveData.estadoPolen?.localizada,
    quantidadeDePolen: hiveData.estadoPolen?.quantidade,
    rainhaLocalizada: hiveData.estadoRainha?.localizada,
    idadeDaRainha: hiveData.estadoRainha?.estado,
    estadoDaRainha: hiveData.estadoRainha?.aspecto,
  });

  const [listaDeValores, setListaDeValores] = useState([{}]) as any;

  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  
  const { hive, setHive } = useAuth();
  const { hiveID } = route.params as RouteParamsProps;
  const toast = useToast();
  
  function handleGoBack(apiaryID: number) {
    navigation.navigate("Apiario_Detalhes", { apiaryID });
  }
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   api.get(`/colmeias/${hiveID}`).then(async response => {
  //     console.log("resposta", response.data)
  //     await setHiveData(response.data);
  //     setIsLoading(false);
  //   })
  //   }, [hiveID]);

    useEffect(() => {
      setIsLoading(true);
      api.get(`/colmeias/${hiveID}`).then(async response => {
        const dataFromBackend = response.data;
        await setHiveData(dataFromBackend);
        console.log("resposta", dataFromBackend)
        console.log("resposta 2", hiveData)
        setIsLoading(false);
  
        // Atualizar o estado `radioValues` com os dados recebidos do back-end
        setRadioValues({
          novasCriaLocalizada: dataFromBackend?.estadoCriaNova?.localizada,
          quantidadeDeCria: dataFromBackend?.estadoCriaNova?.quantidade,
          estadoDaCriaNova: dataFromBackend?.estadoCriaNova?.estado || '',
          criaMadurasLocalizada: dataFromBackend?.estadoCriaMadura?.localizada || '',
          quantidadeDeCriaMaduras: dataFromBackend?.estadoCriaMadura?.quantidade || '',
          estadoDasCriasMaduras: dataFromBackend?.estadoCriaMadura?.estado || '',
          melLocalizado: dataFromBackend?.estadoMel?.localizada || '',
          quantidadeDeMel: dataFromBackend?.estadoMel?.quantidade || '',
          estadoDoMel: dataFromBackend?.estadoMel?.estado || '',
          polenLocalizado: dataFromBackend?.estadoPolen?.localizada || '',
          quantidadeDePolen: dataFromBackend?.estadoPolen?.quantidade || '',
          rainhaLocalizada: dataFromBackend?.estadoRainha?.localizada || '',
          idadeDaRainha: dataFromBackend?.estadoRainha?.estado || '',
          estadoDaRainha: dataFromBackend?.estadoRainha?.aspecto || '',
        });
        console.log("resposta 3", radioValues)

      }).catch(error => {
        console.error('Erro ao carregar os dados do back-end:', error);
        setIsLoading(false);
      });
    }, [hiveID]);

    async function handleRadioChange(name: string, value: string) {
      setRadioValues((prevColmeiaPreModificacao) => ({
        ...prevColmeiaPreModificacao,
        [name]: value,
      }));

    }

    // console.log("teste Colmeia fora", hiveData)
  
  async function handleSaveRevisao() {

    try { 

      const radiosHive = await api.patch(`/colmeias/${hiveID}`, { 
        estadoCriaNova: {
          localizada: radioValues.novasCriaLocalizada,
          quantidade: radioValues.quantidadeDeCria,
          estado: radioValues.estadoDaCriaNova,
        },
        estadoCriaMadura: {
          localizada: radioValues.criaMadurasLocalizada,
          quantidade: radioValues.quantidadeDeCriaMaduras,
          estado: radioValues.estadoDasCriasMaduras,
        },
        estadoMel: {
          localizada: radioValues.melLocalizado,
          quantidade: radioValues.quantidadeDeMel,
          estado: radioValues.estadoDoMel,
        },
        estadoPolen: {
          localizada: radioValues.polenLocalizado,
          quantidade: radioValues.quantidadeDePolen,
        },
        estadoRainha: {
          localizada: radioValues.rainhaLocalizada,
          estado: radioValues.idadeDaRainha,
          aspecto: radioValues.estadoDaRainha,
        },
      })
    

      if(radiosHive.status === 200) {
        console.log("resposta:", radiosHive.data)
      }

      toast.show({
        title: 'Revisão salva com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch(error: any) {
      toast.show({
        title: 'Ocorreu um erro ao salvar a revisão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

  }
  console.log("teste Colmeia", radioValues)
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
        {isLoading ? <Loading /> : <Center mb={12}>
          <Box my={4} pb={2} mx={isVertical ? 2 : 20} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Novas e Ovos</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group 
              onChange={(value) => handleRadioChange("novasCriaLocalizada", value)}
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              // converter para string
              value={hiveData.estadoCriaNova?.localizada}  
              name="novasCriaLocalizada" 
              accessibilityLabel="Localização de Crias Novas e Ovos">
              
              <Radio colorScheme="emerald" size="lg" value="NÃO" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="SIM" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="VERIFICAÇÃO NÃO POSSIVEL" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="NÃO HAVIA CRIA" my={1}>
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
              <Radio colorScheme="emerald" size="lg" value="SEM CRIA" my={1}>
                Sem Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="POUCA CRIA" my={1}>
                Poucas Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MUITA CRIA" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="CRIA EM OVOS" my={1}>
                Cria em Ovos
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="CRIA EM PUPAS" my={1}>
                Cria em Pupas
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="CRIA EM OVOS E PUPAS" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="NÃO" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="SIM" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="VERIFICAÇÃO NÃO POSSIVEL" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="NÃO HAVIA CRIA" my={1}>
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
              <Radio colorScheme="emerald" size="lg" value="SEM CRIA" my={1}>
                Sem Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="POUCA CRIA" my={1}>
                Poucas Crias
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MUITA CRIA" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="CRIA MADURA ESCURAS" my={1}>
                Maduras Escuras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="CRIA MADURA CLARAS" my={1}>
                Maduras Claras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="CRIA MADURA ESCURAS E CLARAS" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="NÃO" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="SIM" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="VERIFICAÇÃO NÃO POSSIVEL" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="NÃO HAVIA MEL" my={1}>
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
              <Radio colorScheme="emerald" size="lg" value="SEM MEL" my={1}>
                Sem Mel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="POUCO MEL" my={1}>
                Pouco Mel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MUITO MEL" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="MEL MADURO" my={1}>
                Mel Maduro
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MEL VERDE" my={1}>
                Mel Verde
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MEL MADURO E VERDE" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="NÃO" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="SIM" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="VERIFICAÇÃO NÃO POSSIVEL" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="NÃO HAVIA POLEN" my={1}>
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
              <Radio colorScheme="emerald" size="lg" value="SEM POLEN" my={1}>
                Sem Pólen
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="POUCO POLEN" my={1}>
                Pouco Pólen
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="MUITO POLEN" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="NÃO" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="SIM" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="VERIFICAÇÃO NÃO POSSIVEL" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="NÃO HAVIA RAINHA" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="RAINHA COM IDADE CONHECIDA" my={1}>
                Rainha com Idade Conhecida
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="RAINHA COM IDADE DESCONHECIDA" my={1}>
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
              
              <Radio colorScheme="emerald" size="lg" value="RAINHA JOVEM SAUDÁVEL" my={1}>
                Rainha Jovem Saudável
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="RAINHA JOVEM ASPECTO MEDIANO" my={1}>
                Rainha Jovem Aspecto Mediano
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="RAINHA VELHA NÃO SAUDÁVEL" my={1}>
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
          
        </Center>}
        </ScrollView>
      </VStack>
    )
}