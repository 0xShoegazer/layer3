import { useQuery } from '@tanstack/react-query';
import { arbitrum, mainnet } from 'viem/chains';
import { useSelectedChain } from './useSelectedChain';
import { MagicEdenAPIResponse, MagicEdenNFTAsset } from '../types';

export function useGetUserNFTs(address: string) {
  const { currentChainId } = useSelectedChain();

  // Quick mapping for Magic Eden API
  const CHAIN_NAMES: { [chainId: number]: string } = {
    [mainnet.id]: 'ethereum',
    [arbitrum.id]: 'arbitrum',
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Keeping the list short for now and not setting up pagination/virtual scroll at the moment
      const res = await fetch(
        `https://api-mainnet.magiceden.dev/v4/evm-public/assets/user-assets?chain=${CHAIN_NAMES[currentChainId]}&walletAddresses[]=${address}&sortBy=receivedAt&sortDir=desc&limit=5`,
      );
      const nftData: MagicEdenAPIResponse = await res.json();

      // console.log(nftData);
      const dafuq = nftData.assets;
      const deez = dafuq.filter(
        (nft: MagicEdenNFTAsset) => nft.mediaV2 !== undefined,
      );
      console.log(deez);

      return nftData;
    },
  });

  // if (data) console.log(data);
  if (error) console.error(error);

  return {
    nfts: data ?? [],
    isError,
    error,
    isLoading,
  };
}
