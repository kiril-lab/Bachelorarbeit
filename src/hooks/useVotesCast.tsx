import { Console } from "console";
import { BigNumber, ethers } from "ethers";
import { FLIGHT_SERVER_CSS_MANIFEST } from "next/dist/shared/lib/constants";
import { useEffect, useState } from "react";
import { resourceLimits } from "worker_threads";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useVotesCast(
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
          const startBlock = start_Block;
          const endBlock = end_Block;
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
