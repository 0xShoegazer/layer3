'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { mainnet } from 'viem/chains';

function useCurrentChain() {
  const [currentChainId, setCurrentChainId] = useState<number>(mainnet.id);

  return {
    currentChainId,
    setCurrentChainId,
  };
}

export const SelectedChainContext = createContext<ReturnType<
  typeof useCurrentChain
> | null>(null);

export function SelectedChainProvider(props: { children: ReactNode }) {
  const value = useCurrentChain();

  return (
    <SelectedChainContext.Provider value={value}>
      {props.children}
    </SelectedChainContext.Provider>
  );
}

export function useSelectedChain() {
  return useContext(SelectedChainContext) as ReturnType<typeof useCurrentChain>;
}
