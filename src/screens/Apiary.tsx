import { Box, Center, Text } from "native-base";
import { Button } from "../components/Button";

export function Apiary() {
  return (
  <Box flex={1}>
    <Center mt="20%">
      <Text fontSize="xxl" fontFamily="heading">
        Apíario(s)  
      </Text>
    </Center>
    <Center flex={1}>
      <Button
          mt={10}
          title="Adicionar Apíario"
          variant="outline"
          height={100}
          width={300}
          
          />
      </Center>  
  </Box>
  )
};