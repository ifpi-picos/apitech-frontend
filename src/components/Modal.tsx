import React, {useState} from 'react';
import {Alert,ModalProps as ModalPropsReact, Modal as ModalReact, StyleSheet, Text, Pressable, View} from 'react-native';
import { Button, Center } from 'native-base';
import { ApiaryDTO } from '../dtos/ApiaryDTO';
import { api } from '../services/api';
import { string } from 'yup';

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

export default function Modal( { apiary, ApiaryEdit,  onCloseModal, ...props}:ModalProps): JSX.Element {
    
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleEdit = async (apiaryId: any) => {
      const response = await api.patch( `/apiarios/${apiaryId}`,{nome: string });
      if (response.status === 200) {
        console.log('Apiário editado com sucesso');
        alert("Apiario editando com sucesso!")
        handleEdit(response.data); 
        } else {
          console.error('Erro ao editar o apiário');
          // Lide com o erro de acordo com a necessidade
        }
        /*setModalVisible(false)*/
        onCloseModal();
      };
      
      const handleDelete = async (apiaryId: any) => {
        const response = await api.delete(`/apiarios/${apiaryId}`);
        if (response.status === 200) {
          // Remova o apiário do estado ou realize outras ações necessárias
          alert("Apiario excluido com sucesso")
          console.log('Apiário excluído com sucesso');
        } else {
          console.error('Erro ao excluir o apiário');
          // Lide com o erro de acordo com a necessidade
        } 
        onCloseModal();
     /* setModalVisible(false);*/
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
        <View border-top={5}>
          <View >
            <Pressable onPress={onCloseModal}>
            <Center   background-color="white">
                <Button onPress={() =>handleEdit(apiary.nome)} >Editar apiario</Button>
                <Button onPress={()=> handleDelete(apiary.id)} >Deletar apiario</Button>
                <Button onPress={() => onCloseModal()} >fechar</Button>
            </Center>
            </Pressable>
          </View>
        </View>
      </ModalReact>
      )
}