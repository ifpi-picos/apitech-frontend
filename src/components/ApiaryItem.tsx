import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { ApiaryDTO } from "../dtos/ApiaryDTO";
import { Button } from "native-base";
import Modal from "./Modal";
type Props = TouchableOpacityProps & {
  data: ApiaryDTO;
  onEdit: (apiary: ApiaryDTO) => void;
  onDelete: (apiaryId: number) => void;
}



export function ApiaryItem({ data, onEdit, onDelete, ...rest }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.600" alignItems="center" px={4} py={3} pr={4} rounded="md" mb={3}>
        <Button 
          mr={4}
          onPress={() => setModalVisible(true)}>
          <Icon
            as={<Entypo name="edit" />}
            size="md"
            color="gray.100"
          />
        </Button>
        <Heading fontFamily="heading" color="gray.100" flex={1} fontSize="xxl">{data.nome}</Heading>
        <Icon
          as={<Entypo name="chevron-right" />}
          size="lg"
          color="gray.100"
        />
        <Modal
          onCloseModal={() => setModalVisible(false)}
          visible={modalVisible}
          apiary={data}
          onEdit={() => onEdit()}
          onDelete={() => onDelete}
        />
      </HStack>
    </TouchableOpacity>
  )
}