import { Center, Heading } from "native-base";

type Props = {
  title: string;
}

export function ScreenHeader({ title }: Props) {
  return (
      <Center bg="GREEN" pb={4} pt={16} rounded="xl">
        <Heading fontFamily="heading" fontSize="xxl">
          {title}
        </Heading>
      </Center>
    )
}