import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput 
        bg="gray.100"
        h={14}
        w="100%"
        px={4}
        // borderWidth={0}
        fontSize="lg"
        color="gray.100"
        borderWidth={2}
        borderColor="gray.100"
        fontFamily="body"
        placeholderTextColor="gray.100"
        _invalid={{
          fontSize: "lg",  
          borderBottomWidth: 2,
          borderColor: "RED_MID",
        }}
        _focus={{
          fontSize: "lg",  
          borderWidth: 2,
          borderColor: "GREEN",
          color: "gray.100",
          
        }}
        {...rest}
        />

        <FormControl.ErrorMessage>
          {errorMessage}
        </FormControl.ErrorMessage>
    </FormControl>
    )
}