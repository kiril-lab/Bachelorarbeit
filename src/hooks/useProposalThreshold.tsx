import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Network } from "../types/network";
import { useViewContract } from "./useViewContract";
var n: BigNumber;
export default function useProposalThreshold(
  CONTRACT_ADDR: string,
  CONTRACT_ABI: ethers.ContractInterface
) {
  const contract = useViewContract(
    Network.ethereum,
    CONTRACT_ADDR,
    CONTRACT_ABI
  );
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const r: BigNumber = await contract["proposalThreshold"]();
          setThreshold(parseInt(formatEther(r.toString())));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [contract]);

  return threshold;
}
