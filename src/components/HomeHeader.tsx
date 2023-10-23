import { HStack, Heading, Text, VStack, Icon, AlertDialog, Button } from "native-base";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";


export function HomeHeader() {
  const { user, singOut } = useAuth();

  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical
  
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false)
    singOut();
  };
  const onCloseCancel = () => {
    setIsOpen(false)
  };

  const cancelRef = useRef(null);

  function handleSingOut() {
    setIsOpen(!isOpen)
  }

  function getGreeting() {
    const agora = new Date();
    const horaLocal = agora.getHours();
    const horaBrasilia = horaLocal - 3; // Diferença de 3 horas para o fuso horário de Brasília
  
    if (horaBrasilia >= 5 && horaBrasilia < 12) {
      return 'Bom dia';
    } else if (horaBrasilia >= 12 && horaBrasilia < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  return (
      <HStack bg='GREEN' pt={isVertical ? 16 : 8} rounded="xl" pb={4} px={isVertical ? 8 : 32} alignItems="center">

        <VStack flex={1}>
          <Text color="gray.700" fontFamily="body" fontSize="lg">
            Olá, {getGreeting()}
          </Text>

          <Heading color="gray.700" fontFamily="heading" textTransform="capitalize" fontSize="lg">
            {user.nome}
          </Heading>
        </VStack>

        <TouchableOpacity onPress={handleSingOut}>
          <Icon
            as={MaterialIcons}
            name="logout"
            color="RED_MID"
            size={6}
          />
          <Text color="RED_MID">
            Sair
          </Text>
        </TouchableOpacity>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onCloseCancel}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Sair</AlertDialog.Header>
          <AlertDialog.Body flex={1} alignItems="center">
            <Text fontFamily="heading" fontSize="xl">
              Desejar realmente sair?
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2} flex={1} alignItems="center" justifyContent="space-around">
              <Button variant="unstyled" py={4} flex={1} colorScheme="coolGray" onPress={onCloseCancel} ref={cancelRef}>
                <Text fontSize="xl">
                  Cancelar
                </Text>
              </Button>
              <Button colorScheme="danger" py={4} flex={1} onPress={onClose}>
                <Text color="white" fontSize="xl">
                  Sair
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
        
      </HStack>
    )
}