import { CHAIN_ICONS, SUPPORTED_CHAINS } from '@/lib/wagmi-config';
import { Flex } from '@chakra-ui/react';
import { ChainBadge } from './ChainBadge';
import { useSelectedChain } from '@/lib/hooks/useSelectedChain';

export function ChainIconsBanner({
  className,
  gap,
}: {
  className?: string;
  gap?: number;
}) {
  const { setCurrentChainId } = useSelectedChain();

  return (
    <Flex gap={20}>
      {SUPPORTED_CHAINS.map((c) => {
        return (
          <ChainBadge
            key={c.id}
            url={CHAIN_ICONS[c.id]}
            onClick={() => setCurrentChainId(c.id)}
            className={className}
          />
        );
      })}
    </Flex>
  );
}
