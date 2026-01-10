import { Layer3User } from '@/lib/types';
import { Card, Flex, Text } from '@chakra-ui/react';
// import { ChainIconsBanner } from '../ChainIconsBanner';

export default function UserCard({ user }: { user: Layer3User }) {
  return (
    <Card.Root>
      <Card.Header fontWeight={'bold'}>
        <Flex justifyContent={'space-between'}>
          <Text fontSize={'1.1rem'}> {user.username}</Text>
          <Text>{user.address}</Text>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex justifyContent={'space-between'} gap={5}>
          <Text>Layer3 Rank: {user.rank}</Text>
          <Text>Layer3 Level: {user.level}</Text>
          <Text>Layer3 XP: {user.xp}</Text>
          {/* <ChainIconsBanner gap={10} /> */}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
