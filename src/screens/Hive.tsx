import { Flex, Center, VStack, Radio, Text, HStack, Icon, Heading, Spinner, Box, Divider } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { HiveDTO } from "../dtos/HiveDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

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
      <VStack>
        <VStack px={isVertical ? 6 : 32} bg="GREEN" pt={isVertical ? 8 : 4} rounded="xl">
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
            <Heading>Revisão da Colmeia</Heading>
          </Center>
        </VStack>

        <ScrollView>
        <Center>
          <Box my={4} mx={2} bg="gray.100" borderWidth={1} borderColor={"GREEN"} borderBottomRadius={10}>
            <Center py={1}  backgroundColor="BEIGE">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Localização de Crias Novas e Ovos</Text>
            </Center>
            <Text fontSize="lg" fontWeight="bold" pt={2} pl={4}>Cria Localizada:</Text>
            <Radio.Group style={{ flexDirection: "row", width: "100%" , alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} defaultValue="1" name="criaLocalizada" accessibilityLabel="favorite colorscheme">
              
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
                Sem Cria
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="2" my={1}>
                Pouca Cria
              </Radio>
              <Radio colorScheme="emerald" size="lg" value="3" my={1}>
                Muita Cria
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
          
        </Center>
        </ScrollView>
      </VStack>
        //   <>
      //    <Flex justifyContent={"justify"} alignItems={"center"}>
      //   <Text fontSize={"xl"} fontFamily={"heading"} paddingX={20}>Revisão das Colmeias</Text>
      //   <Text left={100}>Numero da Colmeia:</Text>
      // </Flex>
      // <Center>
      //   <ScrollView>

      //   <VStack space={3} bgColor={"GREEN"} h={390} w={350} borderRadius={12}>
      //     <Text fontSize={"xl"} fontFamily={"heading"} justifyContent={"center"} alignItems={"center"}>Localização criar novas e ovos</Text>
      //     <Center borderColor={" BLACK"} bgColor={"WHITE"}>
      //        <Radio.Group flexDirection={"column"}>
      //           <Text right={50} fontFamily={"heading"}>Cria localizada</Text>
      //           <Radio value="Não">Não</Radio>
      //           <Radio value="Sim">Sim</Radio>
      //           <Radio value="Verificação não possivel">Verificação não possivel</Radio>
      //           <Radio value="Não havia crias">Não havia crias</Radio>
      //        </Radio.Group>
      //     </Center>
      //     <Center  bgColor={"WHITE"} >
      //     <Radio.Group flexDirection={"column"}>
      //           <Text right={77} fontFamily={"heading"}>Quantidade de cria</Text>
      //           <Radio value="Sem cria">Sem cria</Radio>
      //           <Radio value="Pouca cria">Pouca cria</Radio>
      //           <Radio value="Muita cria">Muita cria</Radio>
      //        </Radio.Group>
      //     </Center>
      //     <Center borderColor={" BLACK"}  bgColor={"WHITE"}>
      //      <Radio.Group flexDirection={"column"}>
      //           <Text right={50} fontFamily={"heading"}>Estado da cria  nova</Text>
      //           <Radio value="Cria em ovos">Cria em ovos</Radio>
      //           <Radio value="Cria em pupas">Cria em pupas</Radio>
      //           <Radio value="Cria em ovos e pupas">Cria em ovovos e pupas</Radio>
      //        </Radio.Group>
      //     </Center>
      //   </VStack>

      //     <VStack space={3} bgColor={"GREEN"} h={140} w={350} borderRadius={12}>
      //     <Text fontSize={"xl"} fontFamily={"heading"}>Localização de cria madura</Text>
      //       <Center borderColor={" BLACK"} bgColor={"WHITE"} >
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={77} fontFamily={"heading"}>Estado da cria madura</Text>
      //             <Radio value="Sem cria">Cria escura</Radio>
      //             <Radio value="Pouca cria">Cria clara</Radio>
      //             <Radio value="Muita cria">Cria escura e clara</Radio>
      //         </Radio.Group>
      //       </Center>
      //     </VStack>

      //     <VStack space={3} bgColor={"GREEN"} h={390} w={350} borderRadius={12}>
      //     <Text fontSize={"xl"} fontFamily={"heading"}>Localização do mel no ninho</Text>
      //       <Center borderColor={" BLACK"} bg={"WHITE"}>
      //         <Radio.Group flexDirection={"column"}>
      //             <Text right={50} fontFamily={"heading"}>Mel localizado</Text>
      //             <Radio value="Não">Não</Radio>
      //             <Radio value="Sim">Sim</Radio>
      //             <Radio value="Verificação não possivel">Verificação não possivel</Radio>
      //             <Radio value="Não havia crias">Não havia mel</Radio>
      //         </Radio.Group>
      //       </Center>
      //       <Center borderColor={" BLACK"} bgColor={"WHITE"}>
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={50} fontFamily={"heading"}>Estado do mel</Text>
      //             <Radio value="Cria em ovos">Mel maduro</Radio>
      //             <Radio value="Cria em pupas">Mel verde</Radio>
      //             <Radio value="Cria em ovos e pupas">mel maduro e verde</Radio>
      //         </Radio.Group>
      //       </Center>
      //       <Center borderColor={" BLACK"} bgColor={"WHITE"} >
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={77} fontFamily={"heading"}>Quantidade de mel</Text>
      //             <Radio value="Sem cria">Sem mel</Radio>
      //             <Radio value="Pouca cria">Pouco mel</Radio>
      //             <Radio value="Muita cria">Muito mel</Radio>
      //         </Radio.Group>
      //       </Center>
      //     </VStack>

      //     <VStack space={3} bgColor={"GREEN"} h={270} borderRadius={12}>
      //     <Text fontSize={"xl"} fontFamily={"heading"}>Localização do pólen</Text>
      //       <Center borderColor={" BLACK"} bgColor={"WHITE"} >
      //         <Radio.Group flexDirection={"column"}>
      //             <Text right={50} fontFamily={"heading"}>Pólen localizado</Text>
      //             <Radio value="Não">Não</Radio>
      //             <Radio value="Sim">Sim</Radio>
      //             <Radio value="Verificação não possivel">Verificação não possivel</Radio>
      //             <Radio value="Não havia crias">Não havia pólen</Radio>
      //         </Radio.Group>
      //       </Center>
      //       <Center borderColor={" BLACK"} bgColor={"WHITE"}>
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={77} fontFamily={"heading"}>Quantidade de pólen</Text>
      //             <Radio value="Sem cria">Não tempólen</Radio>
      //             <Radio value="Pouca cria">Pouco pólen</Radio>
      //             <Radio value="Muita cria">Muito pólen</Radio>
      //         </Radio.Group>
      //       </Center>
      //     </VStack>

      //     <VStack space={3} bgColor={"GREEN"} h={380} borderRadius={12}>
      //     <Text fontSize={"xl"} fontFamily={"heading"}>Localização da rainha</Text>
      //       <Center bgColor={"WHITE"}>
      //         <Radio.Group flexDirection={"column"}>
      //             <Text right={50} fontFamily={"heading"}>Rainha  localizada</Text>
      //             <Radio >Não</Radio>
      //             <Radio value="Sim">Sim</Radio>
      //             <Radio value="Verificação não possivel">Verificação não possivel</Radio>
      //             <Radio value="Não havia crias">Não havia rainha</Radio>
      //         </Radio.Group>
      //       </Center>
      //       <Center bgColor={"WHITE"} >
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={42} fontFamily={"heading"}>Estado da rainha</Text>
      //             <Radio value="Sem cria">Rainha com idade conhecida</Radio>
      //             <Radio value="Pouca cria">Rianha com idade desconhecida</Radio>
      //         </Radio.Group>
      //       </Center>
      //       <Center bgColor={"WHITE"} >
      //       <Radio.Group flexDirection={"column"}>
      //             <Text right={42} fontFamily={"heading"}>Aspecto da rainha</Text>
      //             <Radio value="Cria em ovos">Rainha jovem e saúdavel</Radio>
      //             <Radio value="Cria em pupas">Rainha jovem aspecto mediano</Radio>
      //             <Radio value="Cria em ovos e pupas">Rainha velha não saúdavel</Radio>
      //         </Radio.Group>
      //       </Center>
      //     </VStack>

      //   </ScrollView>
      // </Center> 
      //   </>
    )
}