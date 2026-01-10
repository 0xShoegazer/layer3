import {
  useGetV3PoolsForPositions,
  useV3Positions,
} from '@/lib/hooks/useGetUniswapV3Positions';
import LoadingIndicator from '../ui/LoadingIndicator';
import { Card, Flex, Text } from '@chakra-ui/react';

export function UserLiquidityPositions({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) {
  const { isLoading, positionCount, error, positions } = useV3Positions(
    address,
    chainId,
  );

  const { pools, isLoadingPools } = useGetV3PoolsForPositions(
    chainId,
    positions,
  );

  if (error) console.log(error);

  // Repetitive pattern here. Should wrap in a suspense or something
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Flex m={15}>
          <Text fontWeight={'bold'} fontSize={'1.1rem'}>
            V3 Position Count: {positionCount}
          </Text>
        </Flex>
      )}

      {positionCount > 0 && (
        <>
          {isLoadingPools ? (
            <Flex justifyContent={'center'}>
              <Text>Loading Pools..</Text>
              <LoadingIndicator />
            </Flex>
          ) : (
            <Flex gap={5}>
              {pools?.map((p) => {
                return (
                  <Card.Root key={p.id}>
                    {/* <Card.Header fontWeight={'bold'} fontSize={'1.1rem'}>
                      {p.token0.symbol}/{p.token1.symbol}
                    </Card.Header> */}
                    <Card.Body>
                      <Flex justifyContent={'space-evenly'} gap={5}>
                        <Text>
                          {' '}
                          {p.token0.symbol}/{p.token1.symbol}
                        </Text>
                      </Flex>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </Flex>
          )}
        </>
      )}
    </>
  );
}
