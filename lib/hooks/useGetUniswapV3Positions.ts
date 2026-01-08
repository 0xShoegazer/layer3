import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { NON_FUNGIBLE_MANAGER_ABI } from '../abis/NonFungiblePositionManager';
import { mainnet } from 'viem/chains';

// Can move these into a unified contracts file or use an SDK, etc.
// All versions of the protocol are not available on every chain.
// Just using mainnet here for example purposes
const MANAGER_ADDRESSES: { [chainId: number]: Address } = {
  [mainnet.id]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
};

export function useGetUniswapV3PositionBalances(
  account: string,
  chainId: number,
) {
  const managerAddress = MANAGER_ADDRESSES[chainId];
  const { data, isLoading, error } = useReadContract({
    abi: NON_FUNGIBLE_MANAGER_ABI,
    address: managerAddress,
    functionName: 'balanceOf',
    args: [account as Address],
    query: {
      enabled: !!account || !!managerAddress,
    },
  });

  if (error) console.log(error);
  if (data) console.log(data);

  return {
    // We don't expect any account balance to ever exceed the bounds of max safe int
    positionCount: Number(data || 0),
    isLoading,
    error,
  };
}

export function useV3Positions() {
  //
}
