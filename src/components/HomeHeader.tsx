import { HStack, Heading, Text, VStack } from "native-base";

export function HomeHeader() {
  return (
      <HStack>
        <VStack bg='gray.100' width="100%" pt={16} pb={5} px={8} alignItems="start">
          <Text color="gray.700" fontSize="lg">
            Olá,
          </Text>

          <Heading color="gray.700" fontSize="lg">
            Fulano
          </Heading>
        </VStack>

        
      </HStack>
    )
}