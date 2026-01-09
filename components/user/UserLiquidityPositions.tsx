import {
  useGetUniswapV3PositionBalances,
  useGetUniswapV3TokenIds,
  useGetV3PoolsForPositions,
  useV3Positions,
} from '@/lib/hooks/useGetUniswapV3Positions';
import LoadingIndicator from '../ui/LoadingIndicator';
import { Flex, Text } from '@chakra-ui/react';

export function UserLiquidityPositions({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) {
  //   const { isLoading, positionCount } = useGetUniswapV3PositionBalances(
  //     address,
  //     chainId,
  //   );
  //   const { tokenIds, isLoading, positionCount, error } = useGetUniswapV3TokenIds(
  //     address,
  //     chainId,
  //   );
  const { isLoading, positionCount, error, positions } = useV3Positions(
    address,
    chainId,
  );

  useGetV3PoolsForPositions(chainId, positions);

  if (error) console.log(error);

  // Repetitive pattern here. Should wrap in a suspense or something
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Flex>
          <Text fontWeight={'bold'} fontSize={'1.1rem'}>
            V3 Position Count: {positionCount}
          </Text>
        </Flex>
      )}
    </>
  );
}
