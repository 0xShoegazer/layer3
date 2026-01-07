import { useQuery } from '@tanstack/react-query';
import { SUPPORTED_CHAINS } from '../wagmi-config';
import { EtherscanApiResponse } from '../types';

export function useGetRecentTransactions(address: string) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`useGetRecentTransactions-${address}`],
    queryFn: async () => {
      const chainData: { [id: number]: EtherscanApiResponse } = {};

      // For example purposes. Would not be efficient and would get throttled with many chains to query for all at once
      for (const chain of SUPPORTED_CHAINS) {
        // This can be paginated if needed with a query param
        const res = await fetch(
          `https://api.etherscan.io/v2/api?apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&chainId=${chain.id}&address=${address}&module=account&action=txList&offset=10`,
        );
        const txs = await res.json();
        chainData[chain.id] = txs;
      }

      return chainData;
    },
  });

  return {
    transactions: data,
    isLoading,
    isError,
    error,
  };
}
