import { Center, Heading, Icon, Pressable, ScrollView, VStack, Text } from "native-base";
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


type FormDataProps = {
  nome: string;
  email?: string;
  password?: string | null;
  old_password?: string;
  password_confirmation?: string | null;
}

const profileSchema = yup.object({
  nome: yup.string().required('Informe o nome'),
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
  const { user, handleDeleteUser } = useAuth();
  const [show, setShow] = useState(false);
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical

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
    console.log(data);
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
            render={({ field: { onChange, value } }) => (
              <Input
                borderWidth={2}
                bg="gray.700"
                color="gray.700"
                rounded="lg"
                label="E-mail"
                isDisabled
                placeholder="E-mail"
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
          />
          <Button bg="red.500" mt={4} title="Excluir usuário" onPress={handleDeleteUserProfile} />
        </VStack>


      </ScrollView>

    </VStack>
  )
};