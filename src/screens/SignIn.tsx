import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Text, VStack, ScrollView } from "native-base"
import { Platform } from "react-native";

import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  function handleSignIn({ email, password }: FormData) {
    console.log(email, password);
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
          <Heading color="gray.700" fontSize="xxl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                secureTextEntry
              />

            )}
          />




          <Button
            onPress={handleSubmit(handleSignIn)}
            title="Acessar"
          />
        </Center>

        <Center mt={40}>
          <Text
            color="gray.700"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          title="Registrar-se"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}


