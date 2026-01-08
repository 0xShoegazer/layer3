import { useGetUniswapV3PositionBalances } from '@/lib/hooks/useGetUniswapV3Positions';
import LoadingIndicator from '../ui/LoadingIndicator';
import { Flex, Text } from '@chakra-ui/react';

export function UserLiquidityPositions({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) {
  const { isLoading, positionCount } = useGetUniswapV3PositionBalances(
    address,
    chainId,
  );
  console.log(address, chainId);

  // Repetitive pattern here. Should wrap in a suspense or something
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Flex>
          <Text fontWeight={'bold'} fontSize={'1.1rem'}>
            Position Count: {positionCount}
          </Text>
        </Flex>
      )}
    </>
  );
}
