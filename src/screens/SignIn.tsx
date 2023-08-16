import { Center, Heading, Text, VStack } from "native-base"
import { Input } from "../components/Input";


export function SignIn() {
  return (
    <VStack flex={1} bg="WHITE" px={10}>
      <Center my={24}>
        <Heading color="gray.700" mr={8} lineHeight={"xs"} fontSize="5xl" fontFamily="heading">
          Api
        </Heading>
        <Heading ml={8} lineHeight={"xs"} color="gray.700" fontSize="5xl" fontFamily="heading">
          Tech
        </Heading>
      </Center>
      <Center>
        <Heading color="gray.700"fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Input 
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input 
          placeholder="Senha"
          secureTextEntry
        />
      </Center>


    </VStack>
  );
}


