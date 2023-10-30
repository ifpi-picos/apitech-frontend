import { Flex, Center, VStack, Radio, Text, HStack, Icon, Heading, Spinner, Box, Divider } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { HiveDTO } from "../dtos/HiveDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Button } from "../components/Button";

type RouteParamsProps = {
  hiveID: number;
}

export function Hive() {
  const [isLoading, setIsLoading] = useState(true);
  const [hiveData, setHiveData] = useState<HiveDTO>({} as HiveDTO);
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  
  const { hive, setHive } = useAuth();
  const { hiveID } = route.params as RouteParamsProps;
  
  function handleGoBack(apiaryID: number) {
    navigation.navigate("Apiario_Detalhes", { apiaryID });
  }
  useEffect(() => {

    hive.forEach(item => {
      if (item.id === hiveID) {
        setHiveData(item);
      }
    })
  }, [hiveID]);

    return (
      <VStack flex={1}>
        <VStack px={isVertical ? 6 : 32} bg="GREEN" pt={isVertical ? 16 : 4} rounded="xl">
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
          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Novas e Ovos</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="novasCriaLocalizada" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="4" my={1}>
                Não havia crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Cria</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="quantidadeDeCria" 
              accessibilityLabel="favorite colorscheme">
              
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
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado da Cria Nova</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="estadoDaCriaNova" 
              accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Cria em Ovos
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Cria em Pupas
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Cria em Ovos e Pupas
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Maduras</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="criaMadurasLocalizada" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="4" my={1}>
                Não havia crias
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Cria</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="quantidadeDeCriaMaduras" 
              accessibilityLabel="favorite colorscheme">
              
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
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="estadoDasCriasMaduras" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Maduras Escuras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Maduras Claras
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Maduras Claras e Escuras
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Mel no Ninho </Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Mel Localizado:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="melLocalizado" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="4" my={1}>
                Não havia Mel
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Mel</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="quantidadeDeMel" 
              accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Muito Mel no Ninho
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Pouco Mel no Ninho
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado do Mel:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="estadoDoMel" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Mel Maduro no Ninho
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Mel Verde no Ninho
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Mel Maduro e Verde no Ninho
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Pólen no Ninho </Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Pólen Localizado:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="polenLocalizado" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="4" my={1}>
                Não havia Pólen
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Quantidade de Pólen</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="quantidadeDePolen" 
              accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Muito Pólen no Ninho
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Pouco Pólen no Ninho
              </Radio>
            </Radio.Group>
          </Box>

          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="GREEN">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização da Rainha </Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Rainha Localizada:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="rainhaLocalizada" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Não
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Sim
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Verificação não possivel
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="4" my={1}>
                Não havia Rainha
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Idade da Rainha</Text>
            <Radio.Group 
              style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} 
              defaultValue="1" 
              name="idadeDaRainha" 
              accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Rainha com Idade Conhecida
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Rainha com Idade Desconhecida
              </Radio>
            </Radio.Group>
            <Center px={4}>
              <Divider justifyContent="center" my={2} w="100%"  bg="GREEN" />
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Estado da Rainha:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="estadoDaRainha" accessibilityLabel="favorite colorscheme">
              
              <Radio colorScheme="emerald" size="lg" value="1" my={1}>
                Rainha Jovem Saudável
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Rainha Jovem Aspecto Mediano
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Rainha Velha Aspecto Não Saudável
              </Radio>
            </Radio.Group>
          </Box>
            <Button
              title="Salvar Revisão"
              w="80%"

            >
            </Button>
          
        </Center>
        </ScrollView>
      </VStack>
    )
}