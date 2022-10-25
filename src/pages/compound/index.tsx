import type { NextPage } from "next";
import { useEffect } from "react";
import Compound from "../../components/Compound/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/Compound/useViewProposals";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  Start_End_Block_Proposal_Parameters,
} from "../../lib/constCompound";

const compound: NextPage = () => {
  const Quorum = useQuorumVotes(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const AllProposals_And_AllExecuted = useViewProposalsEvent();

 
  /* diese console erzeugt die Konstant Start_End_Block_Proposal_ParametersCompound
   in ../src/lib/const.ts
  if (ProposalCreated.length > 0) {
    console.log(ProposalStartEndBlock);
  }*/
  /*diese console erzeugt die Konstant allBlockNumbersExecutedProposalEvent_Compound
   in ../src/lib/const.ts
  console.log(allBlockNumbersForExecutedProposals);
  */
  useEffect(() => {
    AllProposals_And_AllExecuted();
  }, [AllProposals_And_AllExecuted]);
  return (
    <Compound
      quorum={Quorum}
      threshold={Threshold}
    />
  );
};

export default compound;
