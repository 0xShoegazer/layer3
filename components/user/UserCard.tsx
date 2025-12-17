import { Layer3User } from '@/lib/types';
import { Card, Text } from '@chakra-ui/react';

export default function UserCard({ user }: { user: Layer3User }) {
  return (
    <Card.Root>
      <Card.Header>{user.username}</Card.Header>
      <Card.Body>
        <Text>Layer3 Rank: {user.rank}</Text>{' '}
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}
