import { Spinner, Center } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="GREEN">
      <Spinner color="YELLOW" size="lg" />
    </Center>
    );
}