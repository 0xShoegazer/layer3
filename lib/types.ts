import { Address } from 'viem';

export interface Layer3User {
  address: Address;
  username: string;
  rank: number;
}

export interface EtherscanApiResponse {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    timestamp: string;
    hash: string;
    function: string;
  }[];
}
