import React, { useState } from 'react';
import { Alert, ModalProps as ModalPropsReact, Modal as ModalReact, StyleSheet, Text, Pressable, View } from 'react-native';
import { Button, Center, FormControl, Input, WarningOutlineIcon, useToast } from 'native-base';
import { ApiaryDTO } from '../dtos/ApiaryDTO';
import { api } from '../services/api';
import { string } from 'yup';
import { useAuth } from '../hooks/useAuth';

interface ApiaryEdit {
  name?: string;
  id: number;
  usuarioId: number;
}
interface ModalProps extends ModalPropsReact {
  ApiaryEdit: ApiaryEdit;
  apiary: ApiaryDTO;
  onCloseModal: () => void;
  // handleEdit: (apiary: ApiaryDTO) => void;
  // handleDelete: (apiaryId: number) => void;

}

export default function Modal({ apiary, ApiaryEdit, onCloseModal, ...props }: ModalProps): JSX.Element {

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const { fetchApiarys } = useAuth();
  const [ApiEditName, setApiEditName] = useState<ApiaryEdit>({
    id: apiary.id,
    usuarioId: apiary.usuarioId,
    name: apiary.nome,
  } as ApiaryEdit);

  const handleEdit = async (ApiEditName: ApiaryEdit) => {
    try{
      setisLoading(true);
      const response = await api.patch(`/apiarios/${ApiEditName.id}`, { nome: ApiEditName.name, usuarioId: ApiEditName.usuarioId });
      if (response.status === 200) {
        fetchApiarys();
        console.log('Apiário editado com sucesso');
        onCloseModal();
        toast.show({
          title: 'Apiário editado com sucesso',
          placement: 'top',
          bgColor: 'green.500',
        });
      }
      /*setModalVisible(false)*/
      onCloseModal();
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Erro ao editar o apiário',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    finally {
      onCloseModal();
      setisLoading(false);

    }
  };

  const handleDelete = async (apiaryId: number) => {
    try {
      setisLoading(true);
      const response = await api.delete(`/apiarios/${apiaryId}`);
      if (response.status === 200) {
        fetchApiarys();
        toast.show({
          title: 'Apiário excluído com sucesso',
          placement: 'top',
          bgColor: 'green.500',
        });
        onCloseModal();
      }
    }
    catch (error) {
      toast.show({
        title: 'Erro ao excluir o Apiário',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    finally {
      onCloseModal();
      setisLoading(false);
    }

  }
  function handleText(nome: string) {
    setApiEditName({ ...ApiEditName, name: nome });
  }


  return (
    <ModalReact
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onCloseModal();
      }}
      {...props}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          gap: 20,
        }}
      >
        <Center rounded={'xl'} w="80%" backgroundColor="gray.100" px={8} py={6}>

          <FormControl 
            isRequired
            isInvalid={ApiEditName.name === ''}
          >
            <FormControl.Label>
              <Text 
                style={{
                  fontSize: 20,
                  color: '#000',
                }}>
                Edite o Nome
              </Text>
            </FormControl.Label>
            <Input
              fontSize={20}
              color="gray.700"
              marginBottom={4}
              borderWidth={2}
              borderColor={'gray.700'}
              rounded='lg'
              onChangeText={(nome) => handleText(nome)} 
              value={ApiEditName.name}
              placeholder="Insira um Nome" 
            />
            <FormControl.ErrorMessage mb={4} leftIcon={<WarningOutlineIcon size="xs" />}>
              Campo não pode ser vazio
            </FormControl.ErrorMessage>
            <Button

              style={{
                borderRadius: 10,
                paddingHorizontal: 4,
                marginBottom: 10,
              }}
              isLoading={isLoading}

              isDisabled={ApiEditName.name === ''}
              _disabled={{
                opacity: 0.8,
              }}
              
              onPress={() => handleEdit(ApiEditName)}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                >
                Salvar Alterações
              </Text>
            </Button>
          </FormControl>
        </Center>
        <Button
          style={{
            borderRadius: 10,
            paddingHorizontal: 4,
            marginBottom: 10,
            backgroundColor: '#F03434',
          }}
          isLoading={isLoading}
          onPress={() => handleDelete(apiary.id)}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            Excluir Apiário
          </Text>
        </Button>
        <Pressable
          style={{
            borderRadius: 10,
            paddingHorizontal: 4,
            marginBottom: 10,
            backgroundColor: '#727171',
          }}
          onPress={() => onCloseModal()}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            Fechar
          </Text>
        </Pressable>
      </View>
    </ModalReact>
  )
}