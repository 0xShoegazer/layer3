import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { NON_FUNGIBLE_MANAGER_ABI } from '../abis/NonFungiblePositionManager';
import { mainnet } from 'viem/chains';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { multicall } from 'wagmi/actions';
import { wagmiConfig } from '../wagmi-config';
import { defaultAbiCoder } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256 } from '@ethersproject/solidity';
import { Pool, poolInitCodeHash } from '@uniswap/v3-sdk';

// Can move these into a unified contracts file or use an SDK, etc.

// All versions of the protocol are not available on every chain.
// Just using mainnet here for example purposes
const MANAGER_ADDRESSES: { [chainId: number]: Address } = {
  [mainnet.id]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
};

const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  [mainnet.id]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  // [arbitrum.id]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
};

export interface V3PositionDetails {
  nonce: bigint;
  tokenId: number;
  operator: string;
  token0: string;
  token1: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  feeGrowthInside0LastX128: bigint;
  feeGrowthInside1LastX128: bigint;
  tokensOwed0: bigint;
  tokensOwed1: bigint;
}

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

  return {
    // We don't expect any account balance to ever exceed the bounds of max safe int
    positionCount: Number(data || 0),
    isLoading,
    error,
  };
}

export function useGetUniswapV3TokenIds(account: string, chainId: number) {
  const {
    isLoading: isLoadingPositions,
    positionCount,
    error: positionCountError,
  } = useGetUniswapV3PositionBalances(account, chainId);

  const managerAddress = MANAGER_ADDRESSES[chainId];

  const {
    data,
    isLoading: loadingIds,
    error,
  } = useQuery({
    queryKey: [`tokenOfOwnerByIndex-${account}-${chainId}-${positionCount}`],
    queryFn: async () => {
      const calls = [];
      for (let i = 0; i < positionCount; i++) {
        calls.push({
          address: managerAddress,
          abi: NON_FUNGIBLE_MANAGER_ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [account, i],
          chainId,
        });
      }

      const result = await multicall(wagmiConfig, {
        contracts: calls,
      });

      const tokenIds = result.map((tk) => Number(tk.result));

      return tokenIds;
    },
    enabled: !!managerAddress && !!account && positionCount > 0,
  });

  return {
    positionCount,
    tokenIds: data,
    error: positionCountError || error,
    isLoading: isLoadingPositions || loadingIds,
  };
}

export function useV3PositionsFromTokenIds(
  tokenIds: number[] | undefined,
  chainId: number,
) {
  const managerAddress = MANAGER_ADDRESSES[chainId];
  const { data, isLoading, error } = useQuery({
    queryKey: [`useV3PositionsFromTokenIds-${chainId}`],
    queryFn: async () => {
      // The query is disabled if there are no ids
      const calls = tokenIds?.map((id) => {
        return {
          address: managerAddress,
          abi: NON_FUNGIBLE_MANAGER_ABI,
          functionName: 'positions',
          args: [id],
          chainId,
        };
      });

      const result = await multicall(wagmiConfig, {
        contracts: calls || [],
      });

      return result;
    },

    enabled: tokenIds && tokenIds?.length > 0 && !!managerAddress,
  });

  const positions: V3PositionDetails[] = useMemo(() => {
    if (!isLoading && !error && tokenIds && data) {
      return data
        .reduce((acc, curr) => {
          // @ts-expect-error IDK
          acc.push(curr.result);
          return acc;
        }, [])
        .map((result, i) => {
          const tokenId = tokenIds[i];

          return {
            tokenId,
            fee: result[4],
            feeGrowthInside0LastX128: result[8],
            feeGrowthInside1LastX128: result[9],
            liquidity: result[7],
            nonce: result[0],
            operator: result[1],
            tickLower: result[5],
            tickUpper: result[6],
            token0: result[2],
            token1: result[3],
            tokensOwed0: result[10],
            tokensOwed1: result[11],
          };
        });
    }

    return [];
  }, [tokenIds, data, error, isLoading]);

  return {
    positions,
    isLoading,
    error,
  };
}

export function useV3Positions(address: string, chainId: number) {
  const {
    tokenIds,
    isLoading: isLoadingIds,
    positionCount,
    error: idError,
  } = useGetUniswapV3TokenIds(address, chainId);

  const {
    positions,
    isLoading: isLoadingPositions,
    error: posError,
  } = useV3PositionsFromTokenIds(tokenIds, chainId);

  return {
    positions,
    positionCount,
    isLoading: isLoadingIds || isLoadingPositions,
    error: posError || idError,
  };
}

export function useGetV3PoolsForPositions(
  chainId: number,
  positions: V3PositionDetails[],
) {
  const factoryAddress = FACTORY_ADDRESSES[chainId];
  const poolAddresses = useMemo(() => {
    if (!factoryAddress || !positions) return [];

    return positions?.map((pos) => {
      return computePoolAddress({
        factoryAddress,
        tokenA: pos.token0,
        tokenB: pos.token1,
        fee: pos.fee,
        initCodeHashManualOverride: poolInitCodeHash(chainId),
      });
    });
  }, [positions, chainId, factoryAddress]);

  // Have to subgraph load up the pools now to get token data (Basic symbols will work for this)

  console.log(poolAddresses);
}

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
}: {
  factoryAddress: string;
  tokenA: string;
  tokenB: string;
  fee: number;
  initCodeHashManualOverride: string;
}) {
  // const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

  const tokens = [tokenA, tokenB].sort();
  return getCreate2Address(
    factoryAddress,
    keccak256(
      ['bytes'],
      [
        defaultAbiCoder.encode(
          ['address', 'address', 'uint24'],
          [tokens[0], tokens[1], fee],
        ),
      ],
    ),
    initCodeHashManualOverride,
  );
}
