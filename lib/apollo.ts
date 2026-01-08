import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
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
  version: UniswapVersion = 'v2',
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
