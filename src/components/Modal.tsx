import React, { useState } from 'react';
import { Alert, ModalProps as ModalPropsReact, Modal as ModalReact, StyleSheet, Text, Pressable, View } from 'react-native';
import { Button, Center, useToast } from 'native-base';
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
  handleEdit: (apiary: ApiaryDTO) => void;
  handleDelete: (apiaryId: number) => void;

}

export default function Modal({ apiary, ApiaryEdit, onCloseModal, ...props }: ModalProps): JSX.Element {

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const { fetchApiarys } = useAuth();


  const handleEdit = async (apiary: any) => {
    const response = await api.patch(`/apiarios/${apiary.id}`, { nome: apiary.nome });
    if (response.status === 200) {

      console.log('Apiário editado com sucesso');
      alert("Apiario editando com sucesso!")
      handleEdit(response.data);
    } else {
      console.error('Erro ao editar o apiário');
    }
    /*setModalVisible(false)*/
    onCloseModal();
  };

  const handleDelete = async (apiaryId: number) => {
    try{
      const response = await api.delete(`/apiarios/${apiaryId}`);
      setisLoading(true);
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
    catch(error){
      toast.show({
        title: 'Erro ao excluir o Apiário',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    finally{
      onCloseModal();
      setisLoading(false);
    }

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
        <Button 
          style={{
            borderRadius: 10, 
            paddingHorizontal: 4,
            marginBottom: 10,
          }}
          onPress={() => handleEdit(apiary)}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            Editar Apiário
          </Text>
        </Button>
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