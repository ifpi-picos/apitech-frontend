import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: "outline" | "solid"; 
}

export function Button({ title, variant = "solid", ...rest }: Props) {
  return (
    <ButtonNativeBase 
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "GREEN"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="GREEN"
      _pressed={{
        bg: variant === "outline" ? "gray.100" : "YELLOW",
      }}
      rounded={15}
      {...rest}
    >
      <Text 
        color= "gray.700"
        fontFamily="heading"
        fontSize="lg"
      >
        {title}
      </Text>
    </ButtonNativeBase>
    )
}