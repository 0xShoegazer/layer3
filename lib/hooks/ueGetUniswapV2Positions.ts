import { arbitrum, mainnet } from 'viem/chains';

// Can move these into a unified contracts file or use an SDK, etc.
const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  [mainnet.id]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [arbitrum.id]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
};

export function ueGetUniswapV2Positions() {
  //
}
