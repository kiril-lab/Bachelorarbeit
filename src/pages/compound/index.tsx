import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Compound from "../../components/Compound/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/useViewProposalsEvent";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";
import httpContext from "../../http/HttpContext";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  Start_End_Block_Proposal_ParametersCompound,
} from "../../lib/const";
import { RootObject2 } from "../../types/httpCompound";

const data_2: RootObject2 = {
  proposals: [],
};

const compound: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData1] = useState<RootObject2>(data_2);
  const [data2, SetData2] = useState<RootObject2>(data_2);
  const [data3, SetData3] = useState<RootObject2>(data_2);
  const [error, setError] = useState(false);

  const Quorum = useQuorumVotes(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const getAllProposalVoters = (i: number) => {
    const VotesInAlpha = useViewVoteCastEvent(
      Compound_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.startBlock,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.endBlock
    );
    const VotesInBravo = useViewVoteCastEvent(
      Compound_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.startBlock,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.endBlock
    );
    const Votes = [...VotesInAlpha, ...VotesInBravo];
    const args = Votes?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == i);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllVoters = () => {
    const voterBatches = [];
    for (
      let i = 1;
      i <= Start_End_Block_Proposal_ParametersCompound.length;
      i++
    ) {
      voterBatches.push(getAllProposalVoters(i));
    }
    const allAdressVolters = voterBatches.flat();
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    return uniquie.length;
  };
  const votersNumber = getAllVoters();
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
  const proposalsEventsAlpha = ProposalsInAlpha.flat();
  const proposalsEventsBravo = ProposalsInBravo.flat();
  const proposalsExecutedInAlpha = ProposalsExecutedInAlpha.flat();
  const proposalsExecutedInBravo = ProposalsExecutedInBravo.flat();
  const AllProposals = [...proposalsEventsAlpha, ...proposalsEventsBravo];
  const allExecutedProposals = [
    ...proposalsExecutedInAlpha,
    ...proposalsExecutedInBravo,
  ];
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  const allBlockNumbersForExecutedProposals = allExecutedProposals.map((x) => {
    return x.blockNumber;
  });
  /*diese console erzeugt die Konstant AllBlockNumbers_CreateProposalEvent_Compound
   in ../src/lib/const.ts
  console.log(allBlockNumbersForCreatedProposals);*/
  const argsProposolals = AllProposals.map((x) => {
    return x?.args;
  });
  const ProposalStartEndBlock = argsProposolals?.map((x) => {
    const proposalId = x?.[0].toNumber();
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { [proposalId]: { startBlock, endBlock } };
  });
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
    const fetchData = async () => {
      const data1Fetch = await httpService.GetCompound2("1");
      const data2Fetch = await httpService.GetCompound2("2");
      const data3Fetch = await httpService.GetCompound2("3");
      if (
        data1Fetch.successfull ||
        data1Fetch.successfull ||
        data2Fetch.successfull ||
        data3Fetch.successfull
      ) {
        const rez1 = data1Fetch.entity;
        const rez2 = data2Fetch.entity;
        const rez3 = data3Fetch.entity;
        SetData1(rez1! as RootObject2);
        SetData2(rez2! as RootObject2);
        SetData3(rez3! as RootObject2);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [httpService]);
  return (
    <Compound
      data1={data1}
      data2={data2}
      data3={data3}
      quorum={Quorum}
      threshold={Threshold}
      votersNumber={votersNumber}
    />
  );
};

export default compound;
