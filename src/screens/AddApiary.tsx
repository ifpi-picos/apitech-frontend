import { Center, HStack, Icon, Input, VStack, useToast, Text } from "native-base";
import { ScreenHeader } from "../components/ScreenHeader";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Button } from "../components/Button";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ApiaryDTO } from "../dtos/ApiaryDTO";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Feather } from "@expo/vector-icons";

const addApiarySchema = yup.object({
  nome: yup.string().required('Informe o nome do Apiário.').min(3, 'O nome deve ter no mínimo 2 caracteres.'),
})

type AddApiaryProps = {
  nome: string;
}

export function AddApiary() {
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<AddApiaryProps>({
    resolver: yupResolver(addApiarySchema)
  });
  const { user, apiarys, setApiarys  } = useAuth();

  async function handleAddApiary(data: ApiaryDTO) {
    try {
      setIsLoading(true);
      const response = await api.post('/apiarios', data);

      if (response.status === 201) {
        setApiarys([...apiarys, response.data]);
        console.log(response.data);
        toast.show({
          title: 'Apiário cadastrado com sucesso!',
          placement: 'top',
          bgColor: 'green.500',
        });

        // Redirecionar o usuário para a tela de Apiários
        navigation.navigate('Apiário');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensagem) {
        setIsLoading(false);
  
        toast.show({
          title: error.response.data.mensagem,
          placement: 'top',
          bgColor: 'red.500',
        });
      } else {
        setIsLoading(false);
  
        toast.show({
          title: 'Já existe um Apiário com esse nome.',
          placement: 'top',
          bgColor: 'yellow.500',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoback() {
    navigation.navigate("Apiário");
  }
  


  return (
    <VStack flex={1}>
      <ScreenHeader title="Adicionar um Apiário"></ScreenHeader>
      <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={isVertical ? 8 : 32}>
        <VStack flex={1} pt={12} pb={40} mb={8}>

          <Controller
            control={control}
            name="nome"


            render={({ field: { onChange, value } }) => (
              <Input
                color="gray.100"
                fontSize="lg"
                placeholder="Nome do Apiário"
                onChangeText={onChange}
                bg="gray.500"
                returnKeyType="send"
                errorMessage={errors.nome?.message}
              />
            )}
          />
          <Button
            my={12}
            title="Criar Apiário"
            onPress={handleSubmit(handleAddApiary as any)}
            isLoading={isLoading}
          />
          <HStack justifyContent="center">
            <TouchableOpacity onPress={handleGoback} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
              <Icon as={Feather} name="arrow-left" size={8} color="gray.700" />
              <Text fontSize="xl">Voltar</Text>
            </TouchableOpacity>
            </HStack>
        </VStack>
      </VStack>
      </ScrollView>
    </VStack >
    )
}