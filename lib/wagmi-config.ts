import { createConfig, http } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains';

export const SUPPORTED_CHAINS = [mainnet, arbitrum];

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum],

  // Using stock RPC's here for simplicity
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
});
