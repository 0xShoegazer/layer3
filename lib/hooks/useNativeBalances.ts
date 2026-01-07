import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
import { formatEther } from 'viem';

export function useNativeBalances(address: string, chainIds: number[]) {
  // const [balances] = useState<{ [chainId: number]: string }>(P{});

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`useNativeBalances-${address}`],
    queryFn: async () => {
      const balanceData: { [chainId: number]: string } = {};
      for (const id of chainIds) {
        const res = await fetch(
          `https://api.etherscan.io/v2/api?apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&chainId=${id}&address=${address}&module=account&action=balance&tag=latest`,
        );
        const balanceRes = await res.json();
        balanceData[id] = formatEther(balanceRes.result).slice(0, 5);
      }

      return balanceData;
    },
  });

  if (error) console.log(error);

  function getBalanceForChain(chainId: number) {
    return data && data[chainId] ? data[chainId] : '0.00';
  }
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
  return {
    balances: data,
    isLoading,
    isError,
    error,
    getBalanceForChain,
  };
}
