import { Center, HStack, Heading } from "native-base";
import { useWindowDimensions } from "react-native";

type Props = {
  title: string;
  children?: React.ReactNode;
}

export function ScreenHeader({ title, children }: Props) {
  const windowDimensions = useWindowDimensions();
  const isVertical = windowDimensions.height > windowDimensions.width; // Verifica se a orientação é vertical
  return (
      <HStack bg="GREEN" alignItems="center" justifyContent="space-around" pb={isVertical ? 8 : 4} pt={isVertical ? 20 : 8} rounded="xl">
        <Heading fontFamily="heading"  fontSize="xxl">
          {title}
        </Heading>
        {children}
      </HStack>
    )
}