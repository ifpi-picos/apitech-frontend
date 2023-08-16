import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
      <NativeBaseInput 
        bg="white"
        h={14}
        w="100%"
        px={4}
        borderWidth={0}
        fontSize="lg"
        color="gray.700"
        borderBottomWidth={2}
        borderBottomColor="gray.500"
        fontFamily="body"
        mb={4}

        placeholderTextColor="gray.500"
        _focus={{
          fontSize: "lg",  
          borderBottomWidth: 2,
          borderColor: "GREEN",
          color: "gray.700"
        }}
        {...rest}
      />
    )
}