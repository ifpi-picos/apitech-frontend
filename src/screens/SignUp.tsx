import { Center, Heading, Text, VStack, ScrollView } from "native-base"
import { Platform } from "react-native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="WHITE" px={10} pb={Platform.OS === "ios" ? 40 : 16}>
        <Center my={24}>
          <Heading color="gray.700" mr={8} lineHeight={"xs"} fontSize="5xl" fontFamily="heading">
            Api
          </Heading>
          <Heading ml={8} lineHeight={"xs"} color="gray.700" fontSize="5xl" fontFamily="heading">
            Tech
          </Heading>
        </Center>
        <Center>
          <Heading color="gray.700" fontSize="xxl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input
            placeholder="Nome"
          />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Senha"
            secureTextEntry
          />

          <Input
            placeholder="Confirme a Senha"
            secureTextEntry
          />

          <Button
            title="Criar e acessar"
          />
        </Center>

        <Button
          mt={20}
          title="Voltar para o login"
          variant="outline"
        />
      </VStack>
    </ScrollView>
  );
}


