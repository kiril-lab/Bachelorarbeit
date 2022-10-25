import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
} from "../../lib/constCompound";
import { setProposals } from "../../state/ProposalsRequestCompound";
import { Network } from "../../types/network";
import { useViewContract } from "../useViewContract";

export default function useViewProposalsAlpha() {
  const contractAlpha = useViewContract(
    Network.ethereum,
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const contractBravo = useViewContract(
    Network.ethereum,
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo
  );
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      if (contractAlpha || contractBravo) {
        const filter1 = contractAlpha.filters.ProposalCreated(
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
        const filter2 = contractAlpha.filters.ProposalExecuted(null);
        const startBlockAlpha = 9601459;
        const endBlockAlpha = 12140390;
        const arr1 = [];
        const arr2 = [];
        for (let i = startBlockAlpha; i < endBlockAlpha; i += 100000) {
          const _startBlock = i;
          const _endBlock = Math.min(endBlockAlpha, i + 99999);
          const request1 = await contractAlpha.queryFilter(
            filter1,
            _startBlock,
            _endBlock
          );
          const request2 = await contractAlpha.queryFilter(
            filter2,
            _startBlock,
            _endBlock
          );
          arr1.push(request1);
          arr2.push(request2);
        }
        const filter3 = contractBravo.filters.ProposalCreated(
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
        const filter4 = contractBravo.filters.ProposalExecuted(null);
        const startBlockBravo = 12006099;
        const endBlockBravo = 15799268;
        const arr3 = [];
        const arr4 = [];
        for (let i = startBlockBravo; i < endBlockBravo; i += 100000) {
          const _startBlock = i;
          const _endBlock = Math.min(endBlockBravo, i + 99999);
          const request3 = await contractBravo.queryFilter(
            filter3,
            _startBlock,
            _endBlock
          );
          const request4 = await contractBravo.queryFilter(
            filter4,
            _startBlock,
            _endBlock
          );
          arr3.push(request3);
          arr4.push(request4);
        }
        dispatch(
          setProposals({
            proposalsInAlphaCreated: arr1,
            proposalsInAlphaExecuted: arr2,
            proposalsInBravoCreated: arr3,
            proposalsInBravoExecuted: arr4,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);
  return fetchData;
}
