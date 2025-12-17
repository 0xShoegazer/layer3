'use client';

import { Layer3User } from '@/lib/types';
import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../ui/LoadingIndicator';
import Link from 'next/link';
import UserCard from './UserCard';

export default function UserList() {
  const { data, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://layer3.xyz/api/assignment/users');
      const users: { users: Layer3User[] } = await res.json();
      return users.users;
    },
  });

  // TODO: handle potential errors from the API to display for the user for UX purposes
  if (isError) console.log(error);

  return (
    <>
      {data ? (
        <Flex flexDirection={'column'} gap={5}>
          {data.map((user) => {
            return (
              <Link href={'user'} key={user.address}>
                <UserCard user={user} />
              </Link>
            );
          })}
        </Flex>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
