import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
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
        placeholderTextColor="gray.500"
        _invalid={{
          fontSize: "lg",  
          borderBottomWidth: 2,
          borderColor: "RED_MID",
        }}
        _focus={{
          fontSize: "lg",  
          borderBottomWidth: 2,
          borderColor: "GREEN",
          color: "gray.700"
        }}
        {...rest}
        />

        <FormControl.ErrorMessage>
          {errorMessage}
        </FormControl.ErrorMessage>
    </FormControl>
    )
}