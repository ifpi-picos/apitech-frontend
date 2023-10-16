import { AlertDialog, Button, Center, Heading, Icon, Pressable, ScrollView, Text, VStack, useToast } from "native-base";
import { Input } from "../components/Input";
import { ScreenHeader } from "../components/ScreenHeader";
// import { Button } from "../components/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import * as yup from 'yup';
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


type FormDataProps = {
  nome: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const profileSchema = yup.object({

  nome: yup
    .string()
    .required('Informe o nome.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .test('no-spaces', 'O nome não pode conter espaços.', value => {
    return value ? !/\s/.test(value) : true;
  }),

  email: yup
    .string()
    .required('Informe o e-mail.')
    .email('Informe um E-mail válido.'),

  // old_password: yup
  //   .string()
  //   .required('Informe a senha Atual')
  //   .min(8, 'A senha deve ter no mínimo 8 caracteres.')
  //   .nullable()
  //   .transform((value) => !!value ? value : null),

  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .nullable()
    .transform((value) => !!value ? value : null),

  password_confirmation: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema
        
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null),
    })
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, handleDeleteUser, updateUserProfile } = useAuth();
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');

  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  const toast = useToast();


  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      nome: user.nome,
      email: user.email,
      password: undefined,
      password_confirmation: undefined,
    },
    resolver: yupResolver(profileSchema) as any
  });
  const onClose = () => {
    setIsOpen(false)
    handleDeleteUser();
  };
  const onCloseCancel = () => {
    setIsOpen(false)
  };
  const handleDeleteUserProfile = () => {
    setIsOpen(!isOpen)
  }
  const cancelRef = useRef(null);

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.nome = data.nome;
      userUpdated.email = data.email;

      await api.patch('/usuarios', { nome: data?.nome, email: data?.email, senha: data?.password });

      await updateUserProfile(userUpdated);
      setPasswordValue('');
      setPasswordConfirmationValue('');
      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {
        setIsUpdating(false);

        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'red.500',
        });
      } else {
        setIsUpdating(false);

        toast.show({
          title: 'Ocorreu um erro no servidor.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    } finally {
      setIsUpdating(false);
    }
  }


  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={33} px={isVertical ? 8 : 24}>

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                borderWidth={2}
                bg="gray.700"
                color="gray.100"
                rounded="lg"
                label="Nome"
                onChangeText={onChange}
                value={value}
                placeholder="Nome"
                errorMessage={errors.nome?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Informe o e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Informe um E-mail válido'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                borderWidth={2}
                bg="gray.700"
                keyboardType="email-address"
                autoCapitalize="none"
                color="gray.100"
                rounded="lg"
                label="E-mail"
                onChangeText={onChange}
                placeholder="E-mail"
                errorMessage={errors.email?.message}
                value={value}
              />
            )}
          />




        </Center>
        <VStack px={isVertical ? 8 : 24} mt={12} mb={9}>
          <Heading fontFamily="heading" color="gray.300" fontSize="lg" mb={2}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                borderWidth={2}
                bg="gray.500"
                color="gray.100"
                rounded="lg"
                placeholder="Senha atual"
                onChangeText={onChange}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>

                    <Icon as={<MaterialIcons
                      name={show ? "visibility" : "visibility-off"} />}
                      size={5} mr="2" color="gray.100" />
                  </Pressable>
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                borderWidth={2}
                bg="gray.500"
                color="gray.100"
                rounded="lg"
                label="Nova senha"
                
                onChangeText={(value) => {
                  setPasswordValue(value);
                  onChange(value);
                }}
                value={passwordValue}
                placeholder="Nova senha"
                errorMessage={errors.password?.message}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>

                    <Icon as={<MaterialIcons
                      name={show ? "visibility" : "visibility-off"} />}
                      size={5} mr="2" color="gray.100" />
                  </Pressable>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange } }) => (
              <Input
                borderWidth={2}
                bg="gray.500"
                color="gray.100"
                rounded="lg"

                label="Nova senha"
                errorMessage={errors.password_confirmation?.message}
                onChangeText={(value) => {
                  setPasswordConfirmationValue(value);
                  onChange(value);
                }}
                value={passwordConfirmationValue}
                placeholder="Confirme a nova senha"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>

                    <Icon as={<MaterialIcons
                      name={show ? "visibility" : "visibility-off"} />}
                      size={5} mr="2" color="gray.100" />
                  </Pressable>
                }
              />
            )}
          />







          <Button
            title="Salvar alterações"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          >
            <Text fontFamily="heading" fontSize="lg" color="WHITE">
              Salvar alterações
            </Text>
          </Button>
          <Button
            fontFamily="heading"
            fontSize="lg"
            bg="red.500"
            mt={4}
            title="Excluir usuário"
            onPress={handleDeleteUserProfile}>
            <Text fontFamily="heading" fontSize="lg" color="WHITE">
              Excluir usuário
            </Text>
          </Button>

          <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onCloseCancel}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Cancelar</AlertDialog.Header>
              <AlertDialog.Body flex={1} alignItems="center">
                <Text fontFamily="heading" textAlign="center" fontSize="xl">
                  Desejar realmente Excluir Usuário?
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
                      Excluir
                    </Text>
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </VStack>


      </ScrollView>

    </VStack>
  )
};