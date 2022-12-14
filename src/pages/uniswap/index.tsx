import { NextPage } from "next";
import Uniswap from "../../components/Uniswap/Uniswap";
import { CONTRACT_ABI_Alpha } from "../../contracts/uniswap/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../contracts/uniswap/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/useViewProposals";
import {
  Start_End_Block_Proposal_Parameters_Alpha,
  Start_End_Block_Proposal_Parameters_Alpha2,
  Start_End_Block_Proposal_Parameters_Bravo,
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../lib/constUniswap";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";

const uniswap: NextPage = () => {
  const Quorum = useQuorumVotes(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2
  );
  const Threshold = useProposalThreshold(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2
  );
  const ProposalsInAlpha = useViewProposalsEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  ).proposalsCreated;
  const ProposalsInAlpha2 = useViewProposalsEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  ).proposalsCreated;
  const ProposalsInBravo = useViewProposalsEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15875000 //1.11.2022 12Uhr
  ).proposalsCreated;
  const ProposalsExecutedInAlpha = useViewProposalsEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  ).proposalsExecuted;
  const ProposalsExecutedInAlpha2 = useViewProposalsEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  ).proposalsExecuted;
  const ProposalsExecutedInBravo = useViewProposalsEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15875000
  ).proposalsExecuted;
  const ProposalsCanceledInAlpha = useViewProposalsEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  ).proposalsCanceled;
  const ProposalsCanceledInAlpha2 = useViewProposalsEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  ).proposalsCanceled;
  const ProposalsCanceledInBravo = useViewProposalsEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15875000
  ).proposalsCanceled;

  const AllProposals = [
    ...ProposalsInAlpha,
    ...ProposalsInAlpha2,
    ...ProposalsInBravo,
  ].flat();
  //AllProposals in Reality
  AllProposals.splice(8, 9);
  const AllExecutedProposals = [
    ...ProposalsExecutedInAlpha,
    ...ProposalsExecutedInAlpha2,
    ...ProposalsExecutedInBravo,
  ].flat();
  const AllCanceledProposals = [
    ...ProposalsCanceledInAlpha,
    ...ProposalsCanceledInAlpha2,
    ...ProposalsCanceledInBravo,
  ].flat();

  /*diese constant erzeugt die Konstante AllBlockNumbers_CreateProposalEvent
   in ../src/lib/constUniswap.ts*/
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForCreatedProposals);

  /*diese constant erzeugt die Konstante AllExecutedProposalEvent
   in ../src/lib/constUniswap.ts*/
  const allExecutedProposals = AllExecutedProposals.length;
  //console.log(allExecutedProposals);

  /*diese constant erzeugt die Konstante AllCanceledProposalEvent
   in ../src/lib/constUniswap.ts*/
  const allCanceledProposals = AllCanceledProposals.length;
  //console.log(allCanceledProposals);

  const args = AllProposals?.map((x) => x?.args);
  const AllProposers = args?.map((x) => {
    const address: string = x?.[1];
    return address;
  });
  const uniquieAllProposers = AllProposers.filter(
    (x, i) => AllProposers.indexOf(x) === i
  );
  /*diese constant erzeugt die Konstante NumberDifferentProposers
   in ../src/lib/constCompound.ts*/
  const NumberDifferentProposers = uniquieAllProposers.length;
  //console.log(NumberDifferentProposers);

  const argsAlpha = ProposalsInAlpha.flat()?.map((x) => x?.args);
  const argsAlpha2 = ProposalsInAlpha2.flat()?.map((x) => x?.args);
  const argsBravo = ProposalsInBravo.flat()?.map((x) => x?.args);

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters_Alpha
   in ../src/lib/constUniswap.ts*/
  const ProposalStartEndBlockAlpha = argsAlpha?.map((x, i) => {
    const startBlock: number = x?.[6].toNumber();
    const endBlock: number = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  //console.log(ProposalStartEndBlockAlpha)

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters_Alpha2
   in ../src/lib/constUniswap.ts*/
  const ProposalStartEndBlockAlpha2 = argsAlpha2?.map((x, i) => {
    const startBlock: number = x?.[6].toNumber();
    const endBlock: number = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  //console.log(ProposalStartEndBlockAlpha2)

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters_Bravo
   in ../src/lib/constUniswap.ts*/
  const ProposalStartEndBlockBravo = argsBravo?.map((x, i) => {
    const startBlock: number = x?.[6].toNumber();
    const endBlock: number = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  //console.log(ProposalStartEndBlockBravo);

  const getAllProposalVotersInAlpha = (id1: number) => {
    const VotesInAlpha = useViewVoteCastEvent(
      Uniswap_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_Proposal_Parameters_Alpha[id1 - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters_Alpha[id1 - 1]?.endBlock
    );
    const args = VotesInAlpha?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId?.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == id1);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllProposalVotersInAlpha2 = (id2: number) => {
    const VotesInAlpha2 = useViewVoteCastEvent(
      Uniswap_Governor_Alpha2_Addr,
      CONTRACT_ABI_Alpha2,
      Start_End_Block_Proposal_Parameters_Alpha2[id2 - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters_Alpha2[id2 - 1]?.endBlock
    );
    const args = VotesInAlpha2?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId?.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == id2);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllProposalVotersInBravo = (id3: number) => {
    const VotesInBravo = useViewVoteCastEvent(
      Uniswap_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_Proposal_Parameters_Bravo[id3 - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters_Bravo[id3 - 1]?.endBlock
    );
    const args = VotesInBravo?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId?.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == id3);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };

  /*diese Function gibt die Number alle unterschidlische Adresse des Voters und ist als Konstante 
  mit Name NumberDifferentVoters in file ../src/lib/constUniswap.ts gespeichert*/
  const getAllVotersNumber = () => {
    const voterBatches1 = [];
    const voterBatches2 = [];
    const voterBatches3 = [];
    for (
      let i = 1;
      i <= Start_End_Block_Proposal_Parameters_Alpha.length;
      i++
    ) {
      voterBatches1.push(getAllProposalVotersInAlpha(i));
    }
    for (
      let j = 1;
      j <= Start_End_Block_Proposal_Parameters_Alpha2.length;
      j++
    ) {
      voterBatches2.push(getAllProposalVotersInAlpha2(j));
    }
    for (
      let k = 1;
      k <= Start_End_Block_Proposal_Parameters_Bravo.length;
      k++
    ) {
      voterBatches3.push(getAllProposalVotersInBravo(k));
    }

    const allAdressVoltersInALpha = voterBatches1.flat();
    const allAdressVoltersInALpha2 = voterBatches2.flat();
    const allAdressVoltersInBravo = voterBatches3.flat();
    const allAdressVolters = [
      ...allAdressVoltersInALpha,
      ...allAdressVoltersInALpha2,
      ...allAdressVoltersInBravo,
    ];
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    const result = uniquie.length;
    return result;
  };
  //console.log(getAllVotersNumber());

  /*diese Function gibt die Number alle Voters per Proposal und ist als Konstante 
  mit Name NumberVotersPerProposal in file ../src/lib/constUniswap.ts gespeichert*/
  const getNumberVotersPerProposal = () => {
    const voterBatches1 = [];
    const voterBatches2 = [];
    const voterBatches3 = [];
    for (
      let i = 1;
      i <= Start_End_Block_Proposal_Parameters_Alpha.length;
      i++
    ) {
      voterBatches1.push(getAllProposalVotersInAlpha(i).length);
    }
    for (
      let j = 1;
      j <= Start_End_Block_Proposal_Parameters_Alpha2.length;
      j++
    ) {
      voterBatches2.push(getAllProposalVotersInAlpha2(j).length);
    }
    for (
      let k = 1;
      k <= Start_End_Block_Proposal_Parameters_Bravo.length;
      k++
    ) {
      voterBatches3.push(getAllProposalVotersInBravo(k).length);
    }

    const allNumberVoltersPerProposalInALpha = voterBatches1.flat();
    const allNumberVoltersPerProposalInALpha2 = voterBatches2.flat();
    const allNumberVoltersPerProposalInBravo = voterBatches3.flat();
    const allNumberVoltersPerProposal = [
      ...allNumberVoltersPerProposalInALpha,
      ...allNumberVoltersPerProposalInALpha2,
      ...allNumberVoltersPerProposalInBravo,
    ];

    return allNumberVoltersPerProposal;
  };
  //console.log(getNumberVotersPerProposal());
  return (
    <>
      <Uniswap quorum={Quorum} threshold={Threshold} />
    </>
  );
};
export default uniswap;
