import type { NextPage } from "next";
import Compound from "../../components/Compound/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/useViewProposals";
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
  const ProposalsInAlpha = useViewProposalsEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9601459,
    12140390
  ).proposalsCreated;
  const ProposalsInBravo = useViewProposalsEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15799268
  ).proposalsCreated;
  const ProposalsExecutedInAlpha = useViewProposalsEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9601459,
    12140390
  ).proposalsExecuted;
  const ProposalsExecutedInBravo = useViewProposalsEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15799268
  ).proposalsExecuted;

  const AllProposals = [...ProposalsInAlpha, ...ProposalsInBravo].flat();
  const AllExecutedProposals = [
    ...ProposalsExecutedInAlpha,
    ...ProposalsExecutedInBravo,
  ].flat();

  /*diese constant erzeugt die Konstante AllBlockNumbers_CreateProposalEvent
   in ../src/lib/constCompound.ts*/
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForCreatedProposals);

  /*diese constant erzeugt die Konstante allBlockNumbersExecutedProposalEvent
   in ../src/lib/constCompound.ts*/
  const allBlockNumbersForExecutedProposals = AllExecutedProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForExecutedProposals);

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters
   in ../src/lib/constCompound.ts*/
  const args = AllProposals?.map((x) => x?.args);
  const ProposalStartEndBlock = args?.map((x) => {
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  //console.log(ProposalStartEndBlock)
  const getAllProposalVoters = (id: number) => {
    const VotesInAlpha = useViewVoteCastEvent(
      Compound_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
    );
    const VotesInBravo = useViewVoteCastEvent(
      Compound_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
    );
    const Votes = [...VotesInAlpha, ...VotesInBravo];
    const args = Votes?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId?.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == id);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllVoters = () => {
    const voterBatches = [];
    for (let i = 1; i <= Start_End_Block_Proposal_Parameters.length; i++) {
      voterBatches.push(getAllProposalVoters(i));
    }
    const allAdressVolters = voterBatches.flat();
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    return uniquie.length;
  };
  const allVoters = getAllVoters();

  return (
    <Compound quorum={Quorum} threshold={Threshold} votersNumber={allVoters} />
  );
};

export default compound;
