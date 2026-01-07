'use client';

import { Layer3User } from '@/lib/types';
import { Flex } from '@chakra-ui/react';
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
