import { Layer3User } from '@/lib/types';
import { Card, Flex, Text } from '@chakra-ui/react';
import { ChainIconsBanner } from '../ChainIconsBanner';

export default function UserCard({ user }: { user: Layer3User }) {
  return (
    <Card.Root>
      <Card.Header>{user.username}</Card.Header>
      <Card.Body>
        <Flex justifyContent={'space-between'} gap={5}>
          <Text>Layer3 Rank: {user.rank}</Text>
          <ChainIconsBanner gap={10} />
        </Flex>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}
