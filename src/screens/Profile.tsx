import { Center, Heading, Icon, Pressable, ScrollView, VStack } from "native-base";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import { MaterialIcons } from '@expo/vector-icons';


export function Profile() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={33} px={33}>

          <Input 
            borderWidth={2}
            bg="gray.500"
            color="gray.700"
            rounded="lg"
            label="Nome"
            placeholder="Nome"
            value={user.nome}
            isDisabled
            isReadOnly
            
            />
            <Input 
            borderWidth={2}
            bg="gray.500"
            color="gray.700"
            rounded="lg"
            label="E-mail"
            placeholder="E-mail"
            value={user.email}
            isDisabled
            isReadOnly

            />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading fontFamily="heading" color="gray.300" fontSize="lg" mb={2}>
            Alterar senha
          </Heading>
          <Input 
            borderWidth={2}
            bg="gray.500"
            color="gray.700"
            rounded="lg"
            label="Senha atual"
            placeholder="Senha atual"
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable  onPress={() => setShow(!show)}>
                
                <Icon as={<MaterialIcons 
                  name={show ? "visibility" : "visibility-off"} />} 
                  size={5} mr="2" color="gray.100"  />
              </Pressable>
            } 
          />
          <Input 
            borderWidth={2}
            bg="gray.500"
            color="gray.700"
            rounded="lg"
            label="Nova senha"
            placeholder="Nova senha"
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable  onPress={() => setShow(!show)}>
                
                <Icon as={<MaterialIcons 
                  name={show ? "visibility" : "visibility-off"} />} 
                  size={5} mr="2" color="gray.100"  />
              </Pressable>
            }
          />
          <Input 
            borderWidth={2}
            bg="gray.500"
            rounded="lg"
            label="Confirmar nova senha"
            placeholder="Confirmar nova senha"
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable  onPress={() => setShow(!show)}>
                
                <Icon as={<MaterialIcons 
                  name={show ? "visibility" : "visibility-off"} />} 
                  size={5} mr="2" color="gray.100"  />
              </Pressable>
            }
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