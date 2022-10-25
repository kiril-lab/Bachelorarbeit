import { NextPage } from "next";
import Uniswap from "../../components/Uniswap/Uniswap";
import { CONTRACT_ABI_Alpha } from "../../contracts/uniswap/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../contracts/uniswap/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/useViewProposals";
import {
  Start_End_Block_Proposal_Parameters,
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../lib/constUniswap";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";

const uniswap: NextPage = () => {
  const Quorum = useQuorumVotes(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
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
    15760070
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
    15760070
  ).proposalsExecuted;

  const AllProposals = [
    ...ProposalsInAlpha,
    ...ProposalsInAlpha2,
    ...ProposalsInBravo,
  ].flat();
  const AllExecutedProposals = [
    ...ProposalsExecutedInAlpha,
    ...ProposalsExecutedInAlpha2,
    ...ProposalsExecutedInBravo,
  ].flat();

  /*diese constant erzeugt die Konstante AllBlockNumbers_CreateProposalEvent
   in ../src/lib/constUniswap.ts*/
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForCreatedProposals);

  /*diese constant erzeugt die Konstante allBlockNumbersExecutedProposalEvent
   in ../src/lib/constUniswap.ts*/
  const allBlockNumbersForExecutedProposals = AllExecutedProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForExecutedProposals);

  /*diese constant erzeugt die Konstante Start_End_Block_Proposal_Parameters
   in ../src/lib/constUniswap.ts*/
  const args = AllProposals?.map((x) => x?.args);
  const ProposalStartEndBlock = args?.map((x) => {
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { startBlock, endBlock };
  });
  //console.log(ProposalStartEndBlock)
  const getAllProposalVoters = (id: number) => {
    const VotesInAlpha = useViewVoteCastEvent(
      Uniswap_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
    );
    const VotesInAlpha2 = useViewVoteCastEvent(
      Uniswap_Governor_Alpha2_Addr,
      CONTRACT_ABI_Alpha2,
      Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
    );
    const VotesInBravo = useViewVoteCastEvent(
      Uniswap_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
      Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
    );
    const Votes = [...VotesInAlpha, ...VotesInAlpha2, ...VotesInBravo];
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
    <>
      <Uniswap quorum={Quorum} threshold={Threshold} votersNumber={allVoters} />
    </>
  );
};
export default uniswap;
