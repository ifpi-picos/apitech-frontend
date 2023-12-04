import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { ApiaryDTO } from "../dtos/ApiaryDTO";
import { Button } from "native-base";
import Modal from "./Modal";

type Props = TouchableOpacityProps & {
  data: ApiaryDTO;
}

export function ApiaryItem({ data, ...rest }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <HStack 
      alignItems={'center'}
      justifyContent={'space-between'}
      mb={4}
    >

      <Button
        
        onPress={() => setModalVisible(true)}>
        <Icon
          as={<Entypo name="edit" />}
          size="lg"
          color="gray.100"
        />
      </Button>
      <Text>-</Text>
      <TouchableOpacity {...rest}
        style={{
          width: '80%',
          alignItems: 'center',
          borderRadius: 10,
          paddingVertical: 4,
          paddingHorizontal: 2,
          // marginBottom: 10,
          backgroundColor: '#2e2d2d',
        }}
      >
        <HStack bg="gray.600" justifyContent={"center"} alignItems="center" px={4} py={3} pr={4} rounded="md" >
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
            ApiaryEdit={data}
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}