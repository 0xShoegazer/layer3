import { Flex, Spinner } from '@chakra-ui/react';

export default function LoadingIndicator() {
  return (
    <Flex justifyContent={'center'}>
      <Spinner />
    </Flex>
  );
}
