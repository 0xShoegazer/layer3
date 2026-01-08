import { useGetUserNFTs } from '@/lib/hooks/useGetUserNFTs';
import LoadingIndicator from '../ui/LoadingIndicator';
import { Card, Flex, Image } from '@chakra-ui/react';

export function UserNFTsList({ address }: { address: string }) {
  const { isLoading, nfts } = useGetUserNFTs(address);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Flex justifyContent={'space-evenly'} gap={5}>
          {nfts.map((nft) => {
            return (
              <Card.Root key={nft.name}>
                <Card.Header fontWeight={'bold'}>{nft.name}</Card.Header>
                <Card.Body>
                  <Image
                    src={nft.mediaV2.main.uri}
                    alt={nft.name}
                    width={74}
                    height={74}
                  />
                </Card.Body>
                <Card.Footer />
              </Card.Root>
            );
          })}
        </Flex>
      )}
    </>
  );
}
