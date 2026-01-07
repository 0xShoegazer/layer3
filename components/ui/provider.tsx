'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi-config';
import { CurrentUserDataProvider } from '@/lib/hooks/useCurrentUser';

const queryClient = new QueryClient();

export function Provider(props: ColorModeProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <CurrentUserDataProvider>
            <ColorModeProvider {...props} />
          </CurrentUserDataProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
