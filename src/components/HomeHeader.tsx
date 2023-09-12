import { HStack, Heading, Text, VStack, Icon, AlertDialog, Button } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";


export function HomeHeader() {
  const { user, singOut } = useAuth();

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
    // singOut();
  }

  return (
      <HStack bg='GREEN' pt={12} pb={5} px={8} alignItems="center">

        <VStack flex={1}>
          <Text color="gray.700" fontFamily="body" fontSize="lg">
            Olá, Bom dia
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
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onCloseCancel} ref={cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Sair
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
        
      </HStack>
    )
}