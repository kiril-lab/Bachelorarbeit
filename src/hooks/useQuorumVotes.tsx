import { BigNumber, ethers } from "ethers";
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
  const [quorum, setQuorum] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const r: BigNumber = await contract["quorumVotes"]();
          setQuorum(r.toString());
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract]);

  return quorum;
}
