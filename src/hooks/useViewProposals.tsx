import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useViewProposalsEvent(
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

  const event: ethers.Event[][] = [];
  const [proposalsCreated, setProposalsCreated] = useState(event);
  const [proposalsExecuted, setProposalsExecuted] = useState(event);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
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
          const filter2 = contract.filters.ProposalExecuted(null);
          const startBlock = start_Block;
          const endBlock = end_Block;
          const arr1 = [];
          const arr2 = [];
          for (let i = startBlock; i < endBlock; i += 100000) {
            const _startBlock = i;
            const _endBlock = Math.min(endBlock, i + 99999);
            const request1 = await contract.queryFilter(
              filter1,
              _startBlock,
              _endBlock
            );
            const request2 = await contract.queryFilter(
              filter2,
              _startBlock,
              _endBlock
            );
            arr1.push(request1);
            arr2.push(request2);
          }
          setProposalsCreated(arr1);
          setProposalsExecuted(arr2);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract, start_Block, end_Block]);
  return { proposalsCreated, proposalsExecuted };
}
