import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: "Subtle" | "solid" ; 
}

export function Button({ title, variant = "solid", ...rest }: Props) {
  return (
    <ButtonNativeBase 
      w="full"
      h={14}
      bg={variant === "Subtle" ? "Subtle" : "GREEN"}
      borderWidth={variant === "Subtle" ? 1 : 0}
      borderColor="GREEN"
      _pressed={{
        bg: variant === "Subtle" ? "gray.100" : "YELLOW",
      }}
      rounded={15}
      {...rest}
    >
      <Text 
        color= "WHITE"
        fontFamily="heading"
        fontSize="lg"
      >
        {title}
      </Text>
    </ButtonNativeBase>
    )
}