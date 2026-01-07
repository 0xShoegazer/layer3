'use client';

import UserCard from '@/components/user/UserCard';
import UserTransactions from '@/components/user/UserTransactions';
import { useSelectedUser } from '@/lib/hooks/useCurrentUser';
import { Flex, Tabs } from '@chakra-ui/react';

export default function User() {
  const { currentUser } = useSelectedUser();

  return (
    <Flex flexDirection={'column'} p={20} gap={5}>
      <UserCard user={currentUser} />

      <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
        <Tabs.List>
          <Tabs.Trigger value="tab-1">Recent Transactions</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">LP Positions</Tabs.Trigger>
          <Tabs.Trigger value="tab-3">Balances</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          Tab 1: Content
          <UserTransactions user={currentUser} />
        </Tabs.Content>
        <Tabs.Content value="tab-2">Tab 2: Content</Tabs.Content>
        <Tabs.Content value="tab-3">Tab 3: Content</Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
