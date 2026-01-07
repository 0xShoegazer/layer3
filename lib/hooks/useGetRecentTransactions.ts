import { useQuery } from '@tanstack/react-query';
import { EtherscanTransactionListItem } from '../types';
import { useSelectedChain } from './useSelectedChain';

export function useGetRecentTransactions(address: string) {
  const { currentChainId } = useSelectedChain();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`useGetRecentTransactions-${address}`],
    queryFn: async () => {
      // const chainData: { [id: number]: EtherscanTransactionListResponse } = {};

      // // For example purposes. Would not be efficient and would get throttled with many chains to query for all at once
      // for (const chain of SUPPORTED_CHAINS) {
      //   // This can be paginated if needed with a query param
      //   const res = await fetch(
      //     `https://api.etherscan.io/v2/api?apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&chainId=${currentChainId}&address=${address}&module=account&action=txList&offset=1`,
      //   );
      //   const txs = await res.json();
      //   chainData[chain.id] = txs;
      // }

      // return chainData;

      // This can be paginated and count limited if needed with query params
      const res = await fetch(
        `https://api.etherscan.io/v2/api?apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&chainId=${currentChainId}&address=${address}&module=account&action=txList&page=1&offset=10&sort=desc`,
      );

      // TODO: Check the API response status/message for errors (OK/NOTOK)
      const data = await res.json();

      return data.result
        ?.filter((tx: EtherscanTransactionListItem) => tx.functionName)
        .map((tx: EtherscanTransactionListItem) => {
          return {
            ...tx,
            timeStamp: new Date(parseInt(tx.timeStamp) * 1000).toUTCString(),
            functionName: tx.functionName.split('(')[0],
          };
        }) as EtherscanTransactionListItem[];
    },
  });

  return {
    transactions: data,
    isLoading,
    isError,
    error,
  };
}
