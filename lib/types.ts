import { Address } from 'viem';

export interface Layer3User {
  address: Address;
  username: string;
  rank: number;
  xp: number;
  level: number;
}

export interface EtherscanApiResponse {
  status: string;
  message: string;
}

export interface EtherscanTransactionListItem {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  functionName: string;
}

export interface EtherscanTransactionListResponse extends EtherscanApiResponse {
  result: {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    function: string;
  }[];
}

type NFTType = {
  uri: string;
  type: 'img' | 'video';
  typeRaw?: string;
};

export interface MagicEdenNFTAsset {
  asset: {
    name: string;
    mediaV2: {
      cover: NFTType;
      main: NFTType;
    };
  };
}

export interface MagicEdenAPIResponse {
  assets: MagicEdenNFTAsset[];
}
