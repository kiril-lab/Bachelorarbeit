import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useQuorumVotes(
  CONTRACT_ADDR: string,
  CONTRACT_ABI: ethers.ContractInterface
) {
  const contract = useViewContract(
    Network.ethereum,
    CONTRACT_ADDR,
    CONTRACT_ABI
  );
  const [quorum, setQuorum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const r: BigNumber = await contract["quorumVotes"]();
          setQuorum(parseInt(formatEther(r.toString())));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract]);

  return quorum;
}
