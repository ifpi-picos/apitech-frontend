import { Center, Heading, Icon, Pressable, ScrollView, VStack, Text, useToast } from "native-base";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from '@expo/vector-icons';
import { useWindowDimensions } from "react-native";
import { api } from "../services/api";


type FormDataProps = {
  nome: string;
  email: string;
  password?: string | null;
  old_password?: string;
  password_confirmation?: string | null;
}

const profileSchema = yup.object({
  
  nome: yup.string().required('Informe o nome.').min(3, 'O nome deve ter no mínimo 2 caracteres.').test('no-spaces', 'O nome não pode conter espaços.', value => {
    return value ? !/\s/.test(value) : true;
  }),
  email: yup.string().required('Informe o e-mail.').email('Informe um E-mail válido.'),
  password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres.').nullable().transform((value) => !!value ? value : null),
  password_confirmation: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
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
  const [show, setShow] = useState(false);
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

  const toast = useToast();


  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    defaultValues: {
      nome: user.nome,
      email: user.email,
      password: '',
      old_password: '',
      password_confirmation: ''
    },
    resolver: yupResolver(profileSchema)
  });

  const handleDeleteUserProfile = () => {
    handleDeleteUser();
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.nome = data.nome;
      userUpdated.email = data.email;

      await api.patch('/usuarios', {nome: data.nome, email: data.email, senha: data.password});

      await updateUserProfile(userUpdated);

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
                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                label="Senha atual"
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
            render={({ field: { onChange, value } }) => (
              <Input
                borderWidth={2}
                bg="gray.500"
                color="gray.100"
                rounded="lg"
                label="Nova senha"
                onChangeText={onChange}
                value={value}
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
            render={({ field: { onChange,value } }) => (
              <Input
                borderWidth={2}
                bg="gray.500"
                color="gray.100"
                rounded="lg"
                label="Nova senha"
                errorMessage={errors.password_confirmation?.message}
                onChangeText={onChange}
                value={value}
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
          />
          <Button bg="red.500" mt={4} title="Excluir usuário" onPress={handleDeleteUserProfile} />
        </VStack>


      </ScrollView>

    </VStack>
  )
};