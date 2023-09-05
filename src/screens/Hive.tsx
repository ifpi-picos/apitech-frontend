import { Flex, Center, VStack, Radio, Text } from "native-base";
import { ScrollView } from "react-native";

export function Hive() {
    return (
        <>
         <Flex justifyContent={"justify"} alignItems={"center"}>
        <Text fontSize={"xl"} fontFamily={"heading"} paddingX={20}>Revisão das Colmeias</Text>
        <Text left={100}>Numero da Colmeia:</Text>
      </Flex>
      <Center>
        <ScrollView>

        <VStack space={3} bgColor={"GREEN"} h={390} w={350} borderRadius={12}>
          <Text fontSize={"xl"} fontFamily={"heading"} justifyContent={"center"} alignItems={"center"}>Localização criar novas e ovos</Text>
          <Center borderColor={" BLACK"} bgColor={"WHITE"}>
             <Radio.Group flexDirection={"column"}>
                <Text right={50} fontFamily={"heading"}>Cria localizada</Text>
                <Radio value="Não">Não</Radio>
                <Radio value="Sim">Sim</Radio>
                <Radio value="Verificação não possivel">Verificação não possivel</Radio>
                <Radio value="Não havia crias">Não havia crias</Radio>
             </Radio.Group>
          </Center>
          <Center  bgColor={"WHITE"} >
          <Radio.Group flexDirection={"column"}>
                <Text right={77} fontFamily={"heading"}>Quantidade de cria</Text>
                <Radio value="Sem cria">Sem cria</Radio>
                <Radio value="Pouca cria">Pouca cria</Radio>
                <Radio value="Muita cria">Muita cria</Radio>
             </Radio.Group>
          </Center>
          <Center borderColor={" BLACK"}  bgColor={"WHITE"}>
           <Radio.Group flexDirection={"column"}>
                <Text right={50} fontFamily={"heading"}>Estado da cria  nova</Text>
                <Radio value="Cria em ovos">Cria em ovos</Radio>
                <Radio value="Cria em pupas">Cria em pupas</Radio>
                <Radio value="Cria em ovos e pupas">Cria em ovovos e pupas</Radio>
             </Radio.Group>
          </Center>
        </VStack>

          <VStack space={3} bgColor={"GREEN"} h={140} w={350} borderRadius={12}>
          <Text fontSize={"xl"} fontFamily={"heading"}>Localização de cria madura</Text>
            <Center borderColor={" BLACK"} bgColor={"WHITE"} >
            <Radio.Group flexDirection={"column"}>
                  <Text right={77} fontFamily={"heading"}>Estado da cria madura</Text>
                  <Radio value="Sem cria">Cria escura</Radio>
                  <Radio value="Pouca cria">Cria clara</Radio>
                  <Radio value="Muita cria">Cria escura e clara</Radio>
              </Radio.Group>
            </Center>
          </VStack>

          <VStack space={3} bgColor={"GREEN"} h={390} w={350} borderRadius={12}>
          <Text fontSize={"xl"} fontFamily={"heading"}>Localização do mel no ninho</Text>
            <Center borderColor={" BLACK"} bg={"WHITE"}>
              <Radio.Group flexDirection={"column"}>
                  <Text right={50} fontFamily={"heading"}>Mel localizado</Text>
                  <Radio value="Não">Não</Radio>
                  <Radio value="Sim">Sim</Radio>
                  <Radio value="Verificação não possivel">Verificação não possivel</Radio>
                  <Radio value="Não havia crias">Não havia mel</Radio>
              </Radio.Group>
            </Center>
            <Center borderColor={" BLACK"} bgColor={"WHITE"}>
            <Radio.Group flexDirection={"column"}>
                  <Text right={50} fontFamily={"heading"}>Estado do mel</Text>
                  <Radio value="Cria em ovos">Mel maduro</Radio>
                  <Radio value="Cria em pupas">Mel verde</Radio>
                  <Radio value="Cria em ovos e pupas">mel maduro e verde</Radio>
              </Radio.Group>
            </Center>
            <Center borderColor={" BLACK"} bgColor={"WHITE"} >
            <Radio.Group flexDirection={"column"}>
                  <Text right={77} fontFamily={"heading"}>Quantidade de mel</Text>
                  <Radio value="Sem cria">Sem mel</Radio>
                  <Radio value="Pouca cria">Pouco mel</Radio>
                  <Radio value="Muita cria">Muito mel</Radio>
              </Radio.Group>
            </Center>
          </VStack>

          <VStack space={3} bgColor={"GREEN"} h={270} borderRadius={12}>
          <Text fontSize={"xl"} fontFamily={"heading"}>Localização do pólen</Text>
            <Center borderColor={" BLACK"} bgColor={"WHITE"} >
              <Radio.Group flexDirection={"column"}>
                  <Text right={50} fontFamily={"heading"}>Pólen localizado</Text>
                  <Radio value="Não">Não</Radio>
                  <Radio value="Sim">Sim</Radio>
                  <Radio value="Verificação não possivel">Verificação não possivel</Radio>
                  <Radio value="Não havia crias">Não havia pólen</Radio>
              </Radio.Group>
            </Center>
            <Center borderColor={" BLACK"} bgColor={"WHITE"}>
            <Radio.Group flexDirection={"column"}>
                  <Text right={77} fontFamily={"heading"}>Quantidade de pólen</Text>
                  <Radio value="Sem cria">Não tempólen</Radio>
                  <Radio value="Pouca cria">Pouco pólen</Radio>
                  <Radio value="Muita cria">Muito pólen</Radio>
              </Radio.Group>
            </Center>
          </VStack>

          <VStack space={3} bgColor={"GREEN"} h={380} borderRadius={12}>
          <Text fontSize={"xl"} fontFamily={"heading"}>Localização da rainha</Text>
            <Center bgColor={"WHITE"}>
              <Radio.Group flexDirection={"column"}>
                  <Text right={50} fontFamily={"heading"}>Rainha  localizada</Text>
                  <Radio >Não</Radio>
                  <Radio value="Sim">Sim</Radio>
                  <Radio value="Verificação não possivel">Verificação não possivel</Radio>
                  <Radio value="Não havia crias">Não havia rainha</Radio>
              </Radio.Group>
            </Center>
            <Center bgColor={"WHITE"} >
            <Radio.Group flexDirection={"column"}>
                  <Text right={42} fontFamily={"heading"}>Estado da rainha</Text>
                  <Radio value="Sem cria">Rainha com idade conhecida</Radio>
                  <Radio value="Pouca cria">Rianha com idade desconhecida</Radio>
              </Radio.Group>
            </Center>
            <Center bgColor={"WHITE"} >
            <Radio.Group flexDirection={"column"}>
                  <Text right={42} fontFamily={"heading"}>Aspecto da rainha</Text>
                  <Radio value="Cria em ovos">Rainha jovem e saúdavel</Radio>
                  <Radio value="Cria em pupas">Rainha jovem aspecto mediano</Radio>
                  <Radio value="Cria em ovos e pupas">Rainha velha não saúdavel</Radio>
              </Radio.Group>
            </Center>
          </VStack>

        </ScrollView>
      </Center> 
        </>
    )
}