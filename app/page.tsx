import UserList from '@/components/user/UserList';
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={20}>
      <UserList />
    </Box>
  );
}
