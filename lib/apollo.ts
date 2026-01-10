import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import { useMemo } from 'react';
import { arbitrum, mainnet } from 'viem/chains';

// They do not have all versions on all chains
export type UniswapVersion = 'v2' | 'v3' | 'v4';

const UNISWAP_SUBGRAPHS: {
  [chainId: number]: { [version in UniswapVersion]?: string };
} = {
  [mainnet.id]: {
    v2: `https://gateway.thegraph.com/api/af2e836f3f0abca3fa27161a1f55d54f/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`,
    v3: `https://gateway.thegraph.com/api/af2e836f3f0abca3fa27161a1f55d54f/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
  },
  [arbitrum.id]: {
    // TODO: Test URL change to avoid headers
    v3: `https://gateway.thegraph.com/api/af2e836f3f0abca3fa27161a1f55d54f/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM`,
  },
};

export function useUniswapApolloClient(
  chainId: number,
  version: UniswapVersion = 'v3',
) {
  return useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: UNISWAP_SUBGRAPHS[chainId][version] }),
      queryDeduplication: true,
      ssrMode: typeof window === 'undefined',
      defaultOptions: {
        query: {
          fetchPolicy: 'cache-first',
          // errorPolicy: "all",
        },
      },
    });
  }, [chainId, version]);
}

export type GetV3PoolsQuery = {
  __typename?: 'Query';
  pools: Array<{
    __typename?: 'Pool';
    id: string;
    feeTier: string;

    token0: {
      __typename?: 'Token';
      id: string;
      name: string;
      symbol: string;
      decimals: string;
    };
    token1: {
      __typename?: 'Token';
      id: string;
      name: string;
      symbol: string;
      decimals: string;
    };
  }>;
};

// Gives type info to the data returned from a query
export const GET_V3_POOLS_QUERY: TypedDocumentNode<GetV3PoolsQuery> = gql`
  query GetV3Pools(
    $where: Pool_filter
    $first: Int
    $skip: Int
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
  ) {
    pools(
      skip: $skip
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      feeTier

      token0 {
        id
        name
        symbol
        decimals
      }
      token1 {
        id
        name
        symbol
        decimals
      }
    }
  }
`;
