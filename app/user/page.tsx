'use client';

// import { ChainBadge } from '@/components/ChainBadge';
import { ChainIconsBanner } from '@/components/ChainIconsBanner';
import UserCard from '@/components/user/UserCard';
import UserTransactions from '@/components/user/UserTransactions';
import { useSelectedUser } from '@/lib/hooks/useCurrentUser';
import { useNativeBalances } from '@/lib/hooks/useNativeBalances';
import { CHAIN_ICONS, SUPPORTED_CHAINS } from '@/lib/wagmi-config';
import { Flex, Tabs } from '@chakra-ui/react';

export default function User() {
  const { currentUser } = useSelectedUser();
  const {} = useNativeBalances(
    currentUser.address,
    SUPPORTED_CHAINS.map((c) => c.id),
  );
  // const { setCurrentChainId, currentChainId } = useSelectedChain();

  return (
    <Flex flexDirection={'column'} p={20} gap={5}>
      <UserCard user={currentUser} />

      <ChainIconsBanner className="cursor" />

      {/* <Flex>
        <ChainBadge url={CHAIN_ICONS[currentChainId]} />
      </Flex> */}

      <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
        <Tabs.List>
          <Tabs.Trigger value="tab-1">Recent Transactions</Tabs.Trigger>
          <Tabs.Trigger value="tab-3">Token Balances</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">LP Positions</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          <UserTransactions user={currentUser} />
        </Tabs.Content>
        <Tabs.Content value="tab-2">Tab 2: Content</Tabs.Content>
        <Tabs.Content value="tab-3">Tab 3: Content</Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
