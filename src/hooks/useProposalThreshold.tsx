import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";

export default function useProposalThreshold(
  CONTRACT_ADDR: string,
  CONTRACT_ABI: ethers.ContractInterface
) {
  const contract = useViewContract(
    Network.ethereum,
    CONTRACT_ADDR,
    CONTRACT_ABI
  );
  const [threshold, setThreshold] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const r: BigNumber = await contract["proposalThreshold"]();
          setThreshold(r.toString());
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract]);

  return threshold;
}
