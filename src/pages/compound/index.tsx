import type { NextPage } from "next";
import Compound from "../../components/Compound/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import { CONTRACT_ABI_Bravo_AsProxy } from "../../contracts/compound/abi_bravo_asProxy";
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
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo_AsProxy
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
    15875000 //1.11.2022
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
    15875000
  ).proposalsExecuted;
  const ProposalsCanceledInAlpha = useViewProposalsEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9601459,
    12140390
  ).proposalsCanceled;
  const ProposalsCanceledInBravo = useViewProposalsEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15875000
  ).proposalsCanceled;
  const AllProposals = [...ProposalsInAlpha, ...ProposalsInBravo].flat();
  const AllExecutedProposals = [
    ...ProposalsExecutedInAlpha,
    ...ProposalsExecutedInBravo,
  ].flat();
  const AllCanceledProposals = [
    ...ProposalsCanceledInAlpha,
    ...ProposalsCanceledInBravo,
  ].flat();

  /*diese constant erzeugt die Konstante AllBlockNumbers_CreateProposalEvent
   in ../src/lib/constCompound.ts*/
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForCreatedProposals);

  /*diese constant erzeugt die Konstante AllExecutedProposalEvent
   in ../src/lib/constCompound.ts*/
  const allExecutedProposals = AllExecutedProposals.length;
  //console.log(allExecutedProposals);

  /*diese constant erzeugt die Konstante AllCanceledProposalEvent
   in ../src/lib/constCompound.ts*/
  const allCanceledProposals = AllCanceledProposals.length;
  //console.log(allCanceledProposals);

  const args = AllProposals?.map((x) => x?.args);
  const AllProposers = args?.map((x) => {
    const address: string = x?.[1];
    return address;
  });
  //der 133 Proposals ist nicht in der Statistik
  AllProposers.splice(132, 1);
  const uniquieAllProposers = AllProposers.filter(
    (x, i) => AllProposers.indexOf(x) === i
  );

  /*diese constant erzeugt die Konstante NumberDifferentProposers
   in ../src/lib/constCompound.ts*/
  const NumberDifferentProposers = uniquieAllProposers.length;
  //console.log(NumberDifferentProposers);

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters
   in ../src/lib/constCompound.ts*/
  const ProposalStartEndBlock = args?.map((x) => {
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  ProposalStartEndBlock.splice(132, 1);
  //console.log(ProposalStartEndBlock);

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

  /*diese Function gibt die Number alle unterschidlische Adresse des Voters und ist als Konstante 
  mit Name NumberDiffernetVoters in file ../src/lib/constCompound.ts gespeichert*/
  const getAllVotersNumber = () => {
    const voterBatches = [];
    for (let i = 1; i <= Start_End_Block_Proposal_Parameters.length; i++) {
      voterBatches.push(getAllProposalVoters(i));
    }
    const allAdressVolters = voterBatches.flat();
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    const result = uniquie.length;
    return result;
  };
  //console.log(getAllVotersNumber())

  /*diese Function gibt die Number alle Voters per Proposal und ist als Konstante 
  mit Name NumberVotersPerProposal in file ../src/lib/constCompound.ts gespeichert*/
  const getNumberVotersPerProposal = () => {
    const voterBatches = [];
    for (let i = 1; i <= Start_End_Block_Proposal_Parameters.length; i++) {
      voterBatches.push(getAllProposalVoters(i).length);
    }
    const allNumberVoltersPerProposal = voterBatches.flat();
    return allNumberVoltersPerProposal;
  };
  //console.log(getNumberVotersPerProposal())

  return <Compound quorum={Quorum} threshold={Threshold} />;
};

export default compound;
