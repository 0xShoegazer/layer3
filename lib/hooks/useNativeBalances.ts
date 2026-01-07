import { useQuery } from '@tanstack/react-query';

export function useNativeBalances({
  address,
  chainIds,
}: {
  address: string;
  chainIds: number[];
}) {
  //   const { data, isError, error, isLoading } = useQuery({
  //     queryKey: [`useNativeBalances-${address}`],
  //     queryFn: async () => {
  //       for (const id of chainIds) {
  //         const res = await fetch(
  //           `https://api.etherscan.io/v2/api?apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&chainId=${id}&address=${address}&module=account&action=balance&tag=latest`,
  //         );
  //         const data = await res.json();
  //       }
  //       return data;
  //     },
  //   });
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
  //   return {
  //     balances: data,
  //     isLoading,
  //     isError,
  //     error,
  //   };
}
