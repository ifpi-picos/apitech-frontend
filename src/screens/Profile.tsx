import { Center, Heading, ScrollView, VStack } from "native-base";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={33} px={33}>

          <Input 
            borderWidth={2}
            bg="gray.100"
            rounded="lg"
            label="Nome"
            placeholder="Nome"
            />
            <Input 
            borderWidth={2}
            bg="gray.100"
            rounded="lg"
            label="E-mail"
            placeholder="E-mail"
            isDisabled
            />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading fontFamily="heading" color="gray.300" fontSize="lg" mb={2}>
            Alterar senha
          </Heading>
          <Input 
            borderWidth={2}
            bg="gray.100"
            rounded="lg"
            label="Senha atual"
            placeholder="Senha atual"
            secureTextEntry
          />
          <Input 
            borderWidth={2}
            bg="gray.100"
            rounded="lg"
            label="Nova senha"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input 
            borderWidth={2}
            bg="gray.100"
            rounded="lg"
            label="Confirmar nova senha"
            placeholder="Confirmar nova senha"
            secureTextEntry
          />

          <Button 
            title="Salvar alterações"
            mt={4}
          />
        </VStack>

      </ScrollView>

    </VStack>  
  )
};