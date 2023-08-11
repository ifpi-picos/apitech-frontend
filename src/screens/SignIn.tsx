import { Center, Heading, Text, VStack } from "native-base"


export function SignIn() {
  return (
    <VStack flex={1} bg="WHITE">
      <Center my={24}>
        <Heading color="gray.700" mr={8} lineHeight={"sm"} fontSize="5xl" fontFamily="heading">
          Api
        </Heading>
        <Heading ml={8} lineHeight={"sm"} color="gray.700" fontSize="5xl" fontFamily="heading">
          Tech
        </Heading>
      </Center>
      <Center>
        <Heading color="gray.700"fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>
      </Center>


    </VStack>
  );
}


