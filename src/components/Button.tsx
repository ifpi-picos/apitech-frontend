import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase 
      w="full"
      h={14}
      bg="GREEN"
      _pressed={{
        bg: "YELLOW"
      }}
      rounded={15}
      {...rest}
    >
      <Text 
        color="BLACK" 
        fontFamily="heading" 
        fontSize="lg"
      >
        {title}
      </Text>
    </ButtonNativeBase>
    )
}