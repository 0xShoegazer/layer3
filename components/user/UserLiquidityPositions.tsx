import {
  useGetUniswapV3PositionBalances,
  useGetUniswapV3TokenIds,
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
  const { tokenIds, isLoading, positionCount, error } = useGetUniswapV3TokenIds(
    address,
    chainId,
  );

  if (error) console.log(error);
  if (tokenIds) console.log(tokenIds);

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
