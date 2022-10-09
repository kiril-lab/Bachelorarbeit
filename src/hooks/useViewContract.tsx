import { ethers, providers } from "ethers";
import { useMemo } from "react";
import { getRPC } from "../lib/functions";
import { Network } from "../types/network";

export const useViewContract = (
  chainId: Network,
  CONTRACT_ADDR: string,
  CONTRACT_ABI: ethers.ContractInterface
) => {
  return useMemo(() => {
    const provider = new providers.JsonRpcProvider(getRPC(chainId), chainId);
    const contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, provider);
    return contract;
  }, [chainId, CONTRACT_ADDR, CONTRACT_ABI]);
};
