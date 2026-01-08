'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi-config';
import { CurrentUserDataProvider } from '@/lib/hooks/useCurrentUser';
import { SelectedChainProvider } from '@/lib/hooks/useSelectedChain';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const queryClient = new QueryClient();

// Dummy client to give to provider. Instances are chain specific at query time
const gqlClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://flyby-router-demo.herokuapp.com/' }),
  cache: new InMemoryCache(),
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ApolloProvider client={gqlClient}>
            <SelectedChainProvider>
              <CurrentUserDataProvider>
                <ColorModeProvider {...props} />
              </CurrentUserDataProvider>
            </SelectedChainProvider>
          </ApolloProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
