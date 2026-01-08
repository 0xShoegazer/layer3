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
    queryKey: [`useGetUserNFTs-${currentChainId}`],
    queryFn: async () => {
      // Keeping the list short for now and not setting up pagination/virtual scroll at the moment
      const res = await fetch(
        `https://api-mainnet.magiceden.dev/v4/evm-public/assets/user-assets?chain=${CHAIN_NAMES[currentChainId]}&walletAddresses[]=${address}&sortBy=receivedAt&sortDir=desc&limit=20`,
      );
      const nftData: MagicEdenAPIResponse = await res.json();
      const userAssets = nftData.assets
        .filter(
          (nft: MagicEdenNFTAsset) =>
            nft.asset.mediaV2 !== undefined &&
            nft.asset.mediaV2.main.typeRaw === 'image/svg+xml', // TODO: This is a quick test hack to get images viewable without DataURI or video
        )
        .map((a) => a.asset);

      return userAssets;
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
