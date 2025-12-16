import { createConfig, http } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
});
