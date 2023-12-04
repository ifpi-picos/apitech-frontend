import { HStack, VStack, Heading, Icon, Text, Box, Center, Flex, CheckIcon, useToast } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HiveDTO } from "../dtos/HiveDTO";
import { Entypo } from '@expo/vector-icons';
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";


type Props = TouchableOpacityProps & {
  data: HiveDTO;
}


export function HiveItem({ data, ...rest }: Props) {
  const { fetchApiaryDetails } = useAuth();
  const toast = useToast();

  async function handleDeleteHive(id: number) {
    try {
      const response = await api.delete(`/colmeias/${id}`);
      if(response.status === 200) {
        fetchApiaryDetails(data.apiarioId);
        toast.show({
          title: `Colmeia ${data.numero} excluída com sucesso!`,
          placement: 'top',
          bgColor: 'green.500',
        });
        
      }
    }
    catch (error) {
      console.log(error);
      toast.show({
        title: `Erro ao excluir a Colmeia ${data.numero}`,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    finally {
      fetchApiaryDetails(data.apiarioId);
    }
  }
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <TouchableOpacity
        onPress={() => handleDeleteHive(data.id)}
      >
        <Icon
          as={<Entypo name="trash" />}
          size="lg"
          color="RED_MID"
        />
      </TouchableOpacity>
      <TouchableOpacity {...rest} style={{
        width: '85%',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginBottom: 10,
        backgroundColor: '#2e2d2d',
      }}>
        <HStack px={3} py={2} width="100%" justifyContent="space-evenly" alignItems="center">
          <Text fontSize="xl" color="gray.100" mr={4}>
            Colmeia
          </Text>
          <Heading fontSize="xxl" color="gray.100"> N°: 0{data.numero}</Heading>
          <Icon
            as={<Entypo name="chevron-right" />}
            size="lg"
            color="gray.100"
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
