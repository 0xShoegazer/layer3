import { useQuery as useApolloQuery } from '@apollo/client/react';
import { UniswapVersion, useUniswapApolloClient } from '../apollo';
import { gql } from '@apollo/client';

export function useGetUserLps(
  address: string,
  chainId: number,
  version: UniswapVersion = 'v2',
) {
  // Override default client with cached versions
  const client = useUniswapApolloClient(chainId, version);

  // Get account tokenId count from NFM
  // Then get the pools for this token ids...?
  // Pool address is the token0/token1/fee thing
  // Position has the tokens and fee when fetched from the manager

  const { loading, error, data } = useApolloQuery(gql``, {
    client,
  });

  if (error) console.log(error);
  if (data) console.log(data);

  return {
    loading,
    error,
    data,
  };
}
