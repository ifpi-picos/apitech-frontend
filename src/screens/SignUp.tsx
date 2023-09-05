import { Center, Heading, VStack, ScrollView, Text } from "native-base"
import { Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.').min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: yup.string().required('Informe o e-mail.').email('Informe um E-mail válido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  password_confirm: yup.string().required('Informe a confirmação da senha.').oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
})

export function SignUp() {

  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, email, password }: FormDataProps) {
    fetch('https://apitech.kamiapp.com.br/usuario', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: name, email: email, senha: password })
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={Platform.OS === "ios" ? 40 : 16}>
        <Center mt={10}>
          <Heading color="gray.700" mr={8} lineHeight={"xs"} fontSize="5xl" fontFamily="heading">
            Api
          </Heading>
          <Heading ml={8} lineHeight={"xs"} color="gray.700" fontSize="5xl" fontFamily="heading">
            Tech
          </Heading>
        </Center>
        <Center>
          <Heading color="gray.700" fontSize="xxl" mb={3} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Informe o nome',
              minLength: 3,
            }}

            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
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
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            mb={4}
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt='auto'
          title="Voltar para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>

    </ScrollView>
  );
}


