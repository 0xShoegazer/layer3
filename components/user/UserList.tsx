'use client';

import { Layer3User } from '@/lib/types';
import { Card, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function UserList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://layer3.xyz/api/assignment/users');
      const users: { users: Layer3User[] } = await res.json();
      return users.users;
    },
  });

  // TODO: handle errors from the API to display for the user

  if (isError) console.log(error);

  return (
    <>
      {data ? (
        <Flex flexDirection={'column'} gap={5}>
          {data.map((user) => {
            return (
              <Card.Root key={user.address}>
                <Card.Header>{user.username}</Card.Header>
                <Card.Body />
                <Card.Footer />
              </Card.Root>
            );
          })}
        </Flex>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
