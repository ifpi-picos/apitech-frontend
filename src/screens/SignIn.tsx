import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Text, VStack, ScrollView, Pressable, Icon } from "native-base"
import { Platform } from "react-native";

import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from "../hooks/useAuth";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const { singIn, isLoading } = useAuth();
  const [show, setShow] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  function handleSignIn({ email, password }: FormData) {
    singIn(email, password);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}  px={10} pb={Platform.OS === "ios" ? 40 : 16}>
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
                bg="gray.100"

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
                returnKeyType="send"
                bg="gray.100"

                onSubmitEditing={handleSubmit(handleSignIn)}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    
                    <Icon as={<MaterialIcons 
                      name={show ? "visibility" : "visibility-off"} />} 
                      size={5} mr="2" color="gray.500" />
                  </Pressable>
                } 

              />

            )}
          />

          <Button
            onPress={handleSubmit(handleSignIn)}
            title="Acessar"
            isLoading={isLoading}
          />
        </Center>

        <VStack flex={1} justifyContent="flex-end"> 

          <Center>
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
      </VStack>
    </ScrollView>
  );
}


