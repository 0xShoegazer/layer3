'use client';

import { Layer3User } from '@/lib/types';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import UserCard from './UserCard';

export default function UserList({
  users,
  onUserSelected,
}: {
  users: Layer3User[];
  onUserSelected: (user: Layer3User) => void;
}) {
  return (
    <>
      <Flex flexDirection={'column'} gap={5}>
        <Text fontWeight={'bold'}>
          Select a user (this is still ugly looking for now to focus on
          functionality)
        </Text>
        {users.map((user) => {
          return (
            <Link
              href={'user'}
              key={user.address}
              onClick={() => onUserSelected(user)}
            >
              <UserCard user={user} />
            </Link>
          );
        })}
      </Flex>
    </>
  );
}
