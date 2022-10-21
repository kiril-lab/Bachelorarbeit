import {ethers } from "ethers";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useViewEvent(
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
  const [votes, setVotes] = useState(event);
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
          
        /*dies Kode liefert die Konstant-StartEndBloeckeProposal
          in Datei \src\lib\const.ts */ 

        /* for (let i = startBlock; i < endBlock; i += 100000) {
            const _startBlock = i;
            const _endBlock = Math.min(endBlock, i + 99999);*/
          const result = await contract.queryFilter(
            filter,
            /*_*/ startBlock,
            /*_*/ endBlock
          );
          const result1 = await contract.queryFilter(
            filter1,
            /*_*/ startBlock,
            /*_*/ endBlock
          );
          setVotes(result);
          setProposals(result1);
        }
        //}
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract,start_Block,end_Block]);
  return { votes, proposals };
}
