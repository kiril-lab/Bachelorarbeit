import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useEventsCast(
  CONTRACT_ADDR: string,
  CONTRACT_ABI: ethers.ContractInterface,
  start_Block: number,
  end_Block: number
) {
  const contract = useViewContract(
    Network.ethereum,
    CONTRACT_ADDR,
    CONTRACT_ABI
  );
  const event: ethers.Event[] = [];
  const [votes, SetVotes] = useState(event);
  const [proposals, setProposals] = useState(event);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const filter = contract.filters.VoteCast(null, null, null);
          const filter1 = contract.filters.ProposalCreated(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
          const startBlock = start_Block;
          const endBlock = end_Block;
          for (let i = startBlock; i < endBlock; i += 100000) {
            const _startBlock = i;
            const _endBlock = Math.min(endBlock, i + 99999);
            const result = await contract.queryFilter(
              filter,
              _startBlock,
              _endBlock
            );
            const result1 = await contract.queryFilter(
              filter1,
              _startBlock,
              _endBlock
            );
            SetVotes(result);
            setProposals(result1);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract]);
  return { votes, proposals };
}
