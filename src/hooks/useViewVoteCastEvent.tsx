import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useViewVoteCastEvent(
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const filter = contract.filters.VoteCast(null, null, null)
            const result = await contract.queryFilter(
              filter,
              start_Block,
              end_Block
            )
          setVotes(result);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract, start_Block, end_Block]);
  return votes
}
