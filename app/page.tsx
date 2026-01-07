'use client';

import LoadingIndicator from '@/components/ui/LoadingIndicator';
import UserList from '@/components/user/UserList';
import { useSelectedUser } from '@/lib/hooks/useCurrentUser';
import { useGetUserList } from '@/lib/hooks/useGetUserList';
import { Box } from '@chakra-ui/react';

export default function Home() {
  const { users, isError, error, isLoading } = useGetUserList();
  const { setCurrentUser } = useSelectedUser();

  // TODO: handle potential errors from the API to display for the user for UX purposes
  if (isError) console.error(error);

  return (
    <Box p={20}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <UserList users={users} onUserSelected={setCurrentUser} />
      )}
    </Box>
  );
}
